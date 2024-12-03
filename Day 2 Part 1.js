var input = 
`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
    .split('\n')
    .map(x => x.split(' ').map(y => parseInt(y)))

const isValidReports = (reports) => {
    if(reports.length == 1)
        return true
    
    const min = reports[0] < reports[1] && 1 || -3
    const max = reports[0] < reports[1] && 3 || -1
    
    const valids = reports.slice(0, -1)
        .filter((val, idx) => reports[idx + 1] >= (min + val) && reports[idx + 1] <= (max + val))
        
    return valids.length === reports.length -1
}

var result = input.filter(x => isValidReports(x))

console.log(result.length)
























