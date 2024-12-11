console.time()

const input = `0 5601550 3914 852 50706 68 6 645371`
const BLINKS = 75

const baseStones = input.split(' ').map(Number)
let cache = {}
let stones = baseStones.reduce((p, c) => ({ ...p, [c]: 1 }), {})
const engraves = (stone) => {
    if(cache[stone])
        return cache[stone]

    let newStones = []
    const textStone = stone + ""
    if(stone === 0)
        newStones = [1]
    else if(textStone.length % 2 == 0)
        newStones = [ +textStone.slice(0, parseInt(textStone.length/2)), +textStone.slice(parseInt(textStone.length/2))]
    else 
        newStones = [stone * 2024]

    cache[stone] = newStones
    
    return newStones
}

for(let i = 0; i < BLINKS; i++) {
    let newStones = {}
    for(const stone in stones) {
        const nextStones = engraves(+stone)
        for(const nextStone of nextStones) {
            newStones[nextStone] = (newStones[nextStone] ?? 0 ) + stones[stone]
        }
    }
    stones = newStones
}

const result = Object.values(stones).reduce((p, c) => p + c, 0)
console.log(result)

console.timeEnd()
