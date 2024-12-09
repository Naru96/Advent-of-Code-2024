console.time()

const input = 
`T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`

const puzzle = input.split('\n').map(x => x.split(''))

const frequencies = puzzle.map(freq => freq.map(x => 0))
const [lenX, lenY] = [puzzle.length, puzzle[0].length]

const antennas = puzzle
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

for(const key in antennas) {
    if(key === '.')
        continue

    const values = antennas[key], cache = {}

    for(const [currY, currX] of values) {
        for(const [antiNodeY, antiNodeX] of values) {
            if(currX === antiNodeX && currY === antiNodeY)
                continue

            const [firstKey, secondKey] = [`${currX}${currY}${antiNodeX}${antiNodeY}`, `${antiNodeX}${antiNodeY}${currX}${currY}`]
            
            if(cache[firstKey] || cache[secondKey])
                continue

            const [diffX, diffY] = [Math.abs(antiNodeX - currX), Math.abs(antiNodeY - currY)]
            const [maxX, maxY] = [Math.max(currX, antiNodeX), Math.max(currY, antiNodeY)]
            
            const update = (x, y) => {
                let newFrequencies = []
                for(let i = 0;; i++) {
                    const [newX, newY] = [x + (x === maxX && 1 || -1) * i * diffX, y + (y === maxY && 1 || -1) * i * diffY]
                    if(!(newX > -1 && newX < lenX && newY > -1 && newY < lenY))
                        break
                    frequencies[newY][newX] = 1
                    newFrequencies.push([newY, newX])
                }
                return newFrequencies
            }
            update(currX, currY)
            update(antiNodeX, antiNodeY)
            
            cache[firstKey] = 1, cache[secondKey] = 1
        }
    }
}

const result = frequencies.map(freq => freq.filter(x => x == 1).length)
    .reduce((prev, curr) => prev + curr, 0)

console.log(result)

console.timeEnd()
