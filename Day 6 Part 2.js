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

const puzzle = input.split('\n').map(x => x.split(''))

let x, y

puzzle.forEach((block, i) => {
    block.includes('^') && (x = i) && (y = block.indexOf('^'))
})

// T -> Top, B -> Bottom, L -> Left, R -> right
const paths = { 'T': [-1, 0], 'B': [1, 0], 'L': [0, -1], 'R': [0, 1] }
const pathMap = { 'T': 'R', 'B': 'L', 'L': 'T', 'R': 'B' }

const getCopyPuzzle = () => [...puzzle.map(block => [...block])]

function canBeRecursive(x, y, obstacleX, obstableY, newPuzzle) {
    let path = 'T', cache = {}, hasLoop = false

    newPuzzle[obstacleX][obstableY] = '#'
    newPuzzle[x][y] = 'X'

    while (true) {
        const [stepX, stepY] = paths[path]
        const [newX, newY] = [x + stepX, y + stepY]

        const canMove = newX > -1 && newY > -1 && newX < newPuzzle.length && newY < newPuzzle[0].length

        newPuzzle[x][y] = 'X'

        if (canMove) {
            if (newPuzzle[newX][newY] === '#') {
                const key = `${x}${y}${path}`
                if (cache[key]) {
                    hasLoop = true
                    break
                }
                path = pathMap[path], cache[key] = true
                continue
            }
            x = newX, y = newY
        }
        else
            break
    }
    return hasLoop
}

let result = puzzle.map((block, i) =>
    block.filter((item, j) =>
        puzzle[i][j] === '.' && canBeRecursive(x, y, i, j, getCopyPuzzle())
    ).length
)
    .reduce((prev, curr) => prev + curr, 0)

console.log(result)

console.timeEnd()
