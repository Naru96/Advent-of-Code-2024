var input = 
`3   4
4   3
2   5
1   3
3   9
3   3`
    .split('\n')
    .map(x => x.split('   ').map(y => parseInt(y)))

const left = input.map(x => x[0])
const resume = input
    .map(x => x[1])
    .reduce(
        (prev, curr) => (prev[curr] = (prev[curr] || 0) + 1) && prev, {}
    )

const result = left
    .map(x => x * (resume[x] || 0) )
    .reduce((prev, curr) => prev + curr, 0)
    
console.log(result)
