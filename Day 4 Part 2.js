const input =
    `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`

const lines = input.split('\n')
const posibilities = [
    [/M.S/g, /.A./g, /M.S/g],
    [/M.M/g, /.A./g, /S.S/g],
    [/S.M/g, /.A./g, /S.M/g],
    [/S.S/g, /.A./g, /M.M/g]
]
let result = 0
for (let i = 0; i + 2 < lines.length; i++) {
    for (j = 0; j + 2 < lines[0].length; j++) {
        const xContainer = [0, 1, 2].map(x => lines[i + x].slice(j, j + 3))
        const valids = posibilities.filter(posibility => [0, 1, 2]
            .map(x => !!xContainer[x].match(posibility[x]))
            .every(x => x)
        )
        result += valids.length
    }
}

console.log(result)
