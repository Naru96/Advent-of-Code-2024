var list = 
`84283   63343
35360   98209
17841   84541`
  .split('\n')
  .map(x => x
    .split('   ')
    .map(y => parseInt(y))
  )
const left = list.map(x => x[0]), right = list.map(x => x[1])

left.sort((a, b) => a > b? 1 : -1)
right.sort((a, b) => a > b? 1 : -1)

const result = left
  .map((x, idx) => Math.abs(right[idx] - x))
  .reduce((prev, curr) => prev + curr, 0)

console.log(result)
