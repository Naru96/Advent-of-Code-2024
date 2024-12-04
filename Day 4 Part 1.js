const input =
    `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

const lines = input.split('\n')
const regex = /XMAS/g, regexReverse = /SAMX/g
let cols = [...new Array(lines[0].length)].map(() => '')
lines.forEach((line, idx) => {
    cols = cols.map((col, colIdx) => col + line[colIdx])
})

const getDiagonalValues = (lines) => {
    let diagonals = {}
    lines.forEach((line, r) => {
        [...line].forEach((letter, c) => {
            diagonals[r - c] = [...(diagonals[r - c] || []), letter]
        })
    })
    return Object.values(diagonals).map(x => x.join(''))
}

const all = [
    ...lines,
    ...cols,
    ...getDiagonalValues(lines),
    ...getDiagonalValues(lines.map(x => x.split('').reverse().join('')))
]

const result = all
    .map(x => [...x.matchAll(regex), ...x.matchAll(regexReverse)].length)
    .reduce((prev, curr) => prev + curr, 0)

console.log(result)
