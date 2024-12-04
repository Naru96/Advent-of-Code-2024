const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

const reports = input
    .split('\n')
    .map(report => report.split(' ').map(level => parseInt(level)))

const canBeSaved = (levels, min1, max1, min2, max2) => {
    const diffs = levels.slice(0, -1)
        .map((level, i) => levels[i + 1] - level)
  
    return diffs.every(x => x >= min1 && x <= max1)
        || diffs.every(x => x >= min2 && x <= max2)
}

const result = reports.map(levels =>
    canBeSaved(levels, 1, 3, -3, -1)
    || levels
        .map((level, i) => canBeSaved(levels.filter((x, idx) => i != idx), 1, 3, -3, -1))
        .includes(true)
)
    .filter(x => x)
    .length

console.log(result)
