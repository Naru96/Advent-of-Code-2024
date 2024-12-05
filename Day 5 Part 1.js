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

const valids = updates.filter(pages => pages.slice(0, -1)
    .map((page, i) => pages.slice(i + 1)
        .every(x => (mapRules[page] || []).includes(x))
    )
    .every(x => x)
)

const result = valids.map(pages => pages[parseInt(pages.length / 2)])
    .reduce((prev, curr) => prev + curr, 0)

console.log(result)
