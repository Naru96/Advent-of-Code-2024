console.time()

const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

const puzzle = input.split('\n')
    .map(equation => ({ 
        expected: parseInt(equation.split(':')[0]), 
        values:  equation.split(':')[1]
            .trim()
            .split(' ')
            .map(Number)
    }))

function canBeCalibrated(firstStep, acc, expected, left) {
    if(acc > expected)
        return false

    if(left.length === 0)
        return acc === expected

    const nextLeft = left.slice(1)

    if(canBeCalibrated(false, (firstStep && 1 || acc) * left[0], expected, nextLeft))
        return true

    if(canBeCalibrated(false, acc + left[0], expected, nextLeft))
        return true
    
    if(canBeCalibrated(false, Number(acc + '' + left[0]), expected, nextLeft))
        return true

    return false

}

const result = puzzle.filter(equation => canBeCalibrated(true, 0, equation.expected, equation.values))
    .reduce((prev, curr) => prev + curr.expected, 0)

console.log(result)

console.timeEnd()
