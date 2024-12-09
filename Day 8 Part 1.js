
console.time()

const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

const puzzle = input.split('\n').map(x => x.split(''))

const frequencies = puzzle.map(freq => freq.map(x => 0))
const [lenX, lenY] = [puzzle.length, puzzle[0].length]

let map = puzzle
    .reduce((prev, curr, i) => 
        ({ 
            ...prev, 
            ...curr.reduce((subPrev, subCurr, j) => 
                ({ 
                    ...subPrev, 
                    [subCurr]: [...(subPrev[subCurr] || []), [i, j]] 
                }), 
                prev
            )
        }), 
    {})

for(const key in map) {
    
    if(key === '.')
        continue

    const values = map[key], cache = {}
    
    for(const [currY, currX] of values) {
        for(const [antiNodeY, antiNodeX] of values) {
            if(currX === antiNodeX && currY === antiNodeY)
                continue

            const [firstKey, secondKey] = [`${currX}${currY}${antiNodeX}${antiNodeY}`, `${antiNodeX}${antiNodeY}${currX}${currY}`]
            
            if(cache[firstKey] || cache[secondKey])
                continue

            const [diffX, diffY] = [Math.abs(antiNodeX - currX), Math.abs(antiNodeY - currY)]
            const [maxX, maxY] = [Math.max(currX, antiNodeX), Math.max(currY, antiNodeY)]

            const [leftAntiNodeX, leftAntiNodeY] = [
                currX + (currX === maxX && 1 || -1) * diffX, 
                currY + (currY === maxY && 1 || -1) * diffY
            ]
            const [rightAntiNodeX, rightAntiNodeY] = [
                antiNodeX + (antiNodeX === maxX && 1 || -1) * diffX, 
                antiNodeY + (antiNodeY === maxY && 1 || -1) * diffY
            ]

            if(leftAntiNodeX > -1 && leftAntiNodeY > -1 && leftAntiNodeX < lenX && leftAntiNodeY < lenY)
                frequencies[leftAntiNodeY][leftAntiNodeX] = 1

            if(rightAntiNodeX > -1 && rightAntiNodeY > -1 && rightAntiNodeX < lenX && rightAntiNodeY < lenY)
                    frequencies[rightAntiNodeY][rightAntiNodeX] = 1
            
            cache[firstKey] = 1, cache[secondKey] = 1
        }
    }
}
const result = frequencies.map(freq => freq.filter(x => x).length)
    .reduce((prev, curr) => prev + curr, 0)

console.log(result)

console.timeEnd()
