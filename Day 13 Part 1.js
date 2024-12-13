console.time()

const input = `
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`
const lines = input.split('\n')
const plays = []
const ADDITIONAL = 0

for(let i = 0; i < lines.length;) {
    if(!lines[i]) {
        i ++
        continue
    }
    const [buttonA, buttonB, prize] = [lines[i], lines[i + 1], lines[i + 2]]
    const [aX, aY] = [...buttonA.matchAll(/\d+/g)].map(x => +x[0])
    const [bX, bY] = [...buttonB.matchAll(/\d+/g)].map(x => +x[0])
    const [prizeX, prizeY] = [...prize.matchAll(/\d+/g)].map(x => ADDITIONAL + (+x[0]))
    plays.push({ a: { x: aX, y: aY }, b: { x: bX, y: bY }, prize: { x: prizeX, y: prizeY } })
    i += 3
}

let tokens = 0
for(const play of plays) { 
    const x = (play.b.x*play.prize.y - play.b.y*play.prize.x)/(play.b.x*play.a.y - play.a.x*play.b.y)
    const y = (play.prize.y - play.a.y * x)/play.b.y
    const isValid = parseInt(x) === x && parseInt(y) === y
    if(isValid)
        tokens += 3 * x + y
}

console.log(tokens)

console.timeEnd()
