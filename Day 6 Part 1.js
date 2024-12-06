console.time()

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

let x, y
const puzzle = input.split('\n').map(x => x.split(''))
puzzle.forEach((block, i) => {
    block.includes('^') && (x = i) && (y = block.indexOf('^'))
})
// T -> Top, B -> Bottom, L -> Left, R -> right
const paths = { 'T': [-1, 0], 'B': [1, 0], 'L': [0, -1], 'R': [0, 1] }
const pathDirection = { 'T': 'R', 'B': 'L', 'L': 'T', 'R': 'B' }
let direction = 'T'

puzzle[x][y] = 'X'

while (true) {
    const [stepX, stepY] = paths[direction]
    const [newX, newY] = [x + stepX, y + stepY]
    const canMove = newX > -1 && newY > -1 && newX < puzzle.length && newY < puzzle[0].length
    puzzle[x][y] = 'X'
    if (canMove) {
        if (puzzle[newX][newY] === '#') {
            direction = pathDirection[direction]
            continue
        }
        x = newX, y = newY
    }
    else
        break
}

const result = puzzle
    .map(block => block.filter(y => y === 'X').length)
    .reduce((prev, curr) => prev + curr, 0)

console.log(result)

console.timeEnd()
