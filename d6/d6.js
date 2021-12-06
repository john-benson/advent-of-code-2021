const fs = require('fs');
const input = fs
    .readFileSync('./d6.input', 'utf-8')
    .split(',')
    .map(Number)

let population = input.reduce((acc, count) => ({
    ...acc,
    [count]: (acc[count] || 0) + 1
}), {})

const generation = current => {
    
    const countEntries = Object.entries(current);

    const result = {};

    let numToReset = 0;

    for ([_age, count] of countEntries) {
        const age = Number(_age);

        if (age > 0) {
            result[age - 1] = count;
        } else {
            result[8] = count;
            numToReset += count
        }
    }

    result[6] = (result[6] || 0) + numToReset

    return result;

}
for (let i = 0; i < 256; i++) {
    population = generation(population);
    
}

console.log(Object.values(population).reduce((acc, cur) => acc + cur))