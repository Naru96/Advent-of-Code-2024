console.time()

const input = `2333133121414131402`

let id = [], block = []
input.split('').map(Number).forEach((x, i) => i % 2 == 0 && id.push(x) || block.push(x))

let files = []
for(let i = 0; i < id.length; i++) {
    for(let j = 0; j < id[i]; j++) files.push(i + '')
    for(let j = 0; j < block[i]; j++) files.push('.')
}

let firstDot = files.indexOf('.'), LastNumber = files.findLastIndex(x => x !== '.')

while(LastNumber > firstDot) {
    files[firstDot] = files[LastNumber]
    files[LastNumber] = '.'

    firstDot = files.indexOf('.', firstDot)

    for(let i = LastNumber; i > 0;) {
      if(files[--i] !== '.')
        LastNumber = i, i = -1
    }
}

const result = files.reduce((p, c, i) => p + i * (c !== '.' && Number(c) || 0), 0)

console.log(result)

console.timeEnd()
