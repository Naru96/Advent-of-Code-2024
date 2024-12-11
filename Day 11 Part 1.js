console.time()

const input = `0 5601550 3914 852 50706 68 6 645371`
const baseStones = input.split(' ').map(Number)
let stones = [...baseStones]
const BLINKS = 25

const engraves = (stone) => {
    let newStones = []
    const textStone = stone + ""
    if(stone === 0)
        newStones = [1]
    else if(textStone.length % 2 == 0)
        newStones = [ +textStone.slice(0, parseInt(textStone.length/2)), +textStone.slice(parseInt(textStone.length/2))]
    else 
        newStones = [stone * 2024]
    
    return newStones
}


for(let i = 0; i < BLINKS; i++) {
    const newStones = []
    for(const stone of stones)
        newStones.push(...engraves(stone))
    stones = newStones
    // console.log(i + 1, '->', newStones.join(' '))
}

console.log(stones.length)

console.timeEnd()
