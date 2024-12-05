const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

let [rules, updates] = input.split('\n\n')
rules = rules.split('\n').map(rule => rule.split('|').map(x => parseInt(x)))
updates = updates.split('\n').map(update => update.split(',').map(x => parseInt(x)))

const mapRules = rules.reduce((prev, curr) => ({
    ...prev,
    [curr[0]]: [...(prev[curr[0]] || []), curr[1]]
}), {})

const isValid = (pages, map) => pages.slice(0, -1)
    .map((page, i) => pages.slice(i + 1)
        .every(x => (map[page] || []).includes(x))
    )
    .every(x => x)

const includes = (list, sublist) => sublist.every(x => list.includes(x))

function fixPages(pages, lefts) {
    if (lefts.length == 0)
        return pages

    let fixedPages = []

    for (const left of lefts) {
        const idx = lefts.indexOf(left)
        const nextLefts = lefts.filter((x, i) => i !== idx)
        if (includes(mapRules[left] || [], nextLefts)) {
            fixedPages = fixPages([...pages, left], nextLefts)
        }
    }

    return fixedPages
}

const result = updates
    .filter(pages => !isValid(pages, mapRules))
    .map(pages => fixPages([], pages))
    .filter(pages => pages.length > 0)
    .map(pages => pages[parseInt(pages.length / 2)])
    .reduce((prev, curr) => prev + curr, 0)

console.log(result)

