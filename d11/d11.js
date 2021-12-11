const fs = require('fs');
const input = fs
    .readFileSync('./d11.input', 'utf-8')
    .split(/\r?\n/)
    .map(i => i.split('').map(Number))
    .filter(i => i.length > 0)

let flashCount = 0;

const prettyPrint = (octopi) => {
    octopi.forEach(row => {
        console.log(row.join(''));
    });
}

const getOctopus = (row, col, octopi) => {
    if (!octopi[row]) {
        return null;
    }

    if (!octopi[row][col]) {
        return null;
    }

    return octopi[row][col];
}

const step = octopi => {
    for (let row = 0; row < octopi.length; row++) {
        for (let col = 0; col < octopi[row].length; col++) {
            octopi[row][col] += 1;
        }
    }

    return octopi;
}

const walk = octopi => {
    let flashed = [];

    for (let row = 0; row < octopi.length; row++) {
        for (let col = 0; col < octopi[row].length; col++) {
            flashAndIncrement(row, col, octopi, flashed, false);
        }
    }
    return { octopi, flashed };
}

const flashAndIncrement = (row, col, octopi, flashed, inc) => { 

    if (inc && getOctopus(row, col, octopi)) {
        octopi[row][col] += 1;
    }

    const cell = `${row},${col}`;
    if (getOctopus(row, col, octopi) && getOctopus(row, col, octopi) > 9 && flashed.indexOf(cell) === -1) {
        flashCount = flashCount + 1; 

        flashed.push(cell);
        flashAndIncrement(row, col - 1, octopi, flashed, true);
        flashAndIncrement(row, col + 1, octopi, flashed, true);
        flashAndIncrement(row - 1, col, octopi, flashed, true);
        flashAndIncrement(row + 1, col, octopi, flashed, true);
        flashAndIncrement(row + 1, col + 1, octopi, flashed, true);
        flashAndIncrement(row - 1, col - 1, octopi, flashed, true);
        flashAndIncrement(row + 1, col - 1, octopi, flashed, true);
        flashAndIncrement(row - 1, col + 1, octopi, flashed, true);
    }

    return octopi;
}


const reset = octopi => {
    for (let row = 0; row < octopi.length; row++) {
        for (let col = 0; col < octopi[row].length; col++) {
            if (octopi[row][col] > 9) { 
                octopi[row][col] = 0;
            }
        }
    }

    return octopi;
}

let octopi = input;

for (let i = 0; i < 1200; i++) {
    octopi = step(octopi);
    let result = walk(octopi);
    octopi = result.octopi;
    let flashed = result.flashed;

    octopi = reset(octopi);
    
    if (flashed.length === octopi.length * octopi[0].length) {
        console.log(`Step ${i + 1} was synced`)
    }
}

console.log(flashCount);