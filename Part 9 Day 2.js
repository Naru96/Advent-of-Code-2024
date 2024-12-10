console.time()

const input = `2333133121414131402`

let times = input.split('').map(Number), ids = times.map((x, i) => `${i % 2 === 0 ? i/2 : '.'}`)
let takeIdx = ids.findLastIndex(x => x !== '.')

for(let i = takeIdx; i > -1; i--) {
    if(ids[i] === '.' || times[i] === 0)
        continue
    
    const updateIdx = ids.findIndex((id, j) => id === '.' && times[j] >= times[i] && j < i)
    
    if(updateIdx === -1)
        continue

    if(updateIdx >= i)
        break

    if(times[updateIdx] === times[i]) {
        ids[updateIdx] = ids[i], ids[i] = '.'
        continue
    }

    times = [...times.slice(0, updateIdx), times[i], times[updateIdx] - times[i], ...times.slice(updateIdx + 1)]
    ids = [...ids.slice(0, updateIdx), ids[i], '.', ...ids.slice(updateIdx + 1)]
    ids[i + 1] = '.'
    i++
}

let files = []
for(let i = 0; i < times.length; i++)
    for(let j = 0; j < times[i]; j++) files.push(ids[i])

const result = files.reduce((p, c, i) => p + i * (c !== '.' && Number(c) || 0), 0)

console.log(result)

console.timeEnd()
