console.time()

const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`
const map = input.split('\n').map(x => x.split('').map(Number))
let starts = []

for(let i = 0; i < map.length; i++)
    for(let j = 0; j < map[i].length; j++)
        if(map[i][j] === 0) starts.push([i, j])

function search(map, i, j, cache, next) {
    if(map[i][j] === 9 && !cache[i + '' + j])
        return (cache[i + '' + j] = true)

    if(map[i][j] === 9)
        return false

    const steps = [[0, -1], [0, 1], [1, 0], [-1, 0]]

    let reacheables = 0
    for(const [stepY, stepX] of steps) { 
        if(!(map[stepY + i] && map[stepY + i][stepX + j]))
            continue
        if(map[stepY + i][stepX + j] == next) {
            reacheables += search(map, stepY + i, stepX + j, cache, next + 1)
        }
    }
    return reacheables
}

const result = starts.map(([i, j]) => search(map, i, j, {}, 1))
    .reduce((p, c) => p + c, 0)

console.log(result)

console.timeEnd()
