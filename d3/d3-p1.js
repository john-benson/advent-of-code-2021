const fs = require('fs');

input = fs.readFileSync('./d3.input', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.split(' '))
  .flatMap(i => i)

let counts = [];
console.log(input)

input.forEach(row => {
  console.log(row)
  row.split('').forEach((char, i) => {
    if (!counts[i]) {
      counts[i] = { zero: 0, one: 0 };
    }

    if (char === '0') {
      counts[i].zero += 1;
    }

    if (char === '1') {
      counts[i].one += 1;
    }
  });
});

let gamma = '';
let omega = '';

counts.forEach(item => {
  if (item.zero > item.one) {
    gamma += '0';
    omega += '1'
  } else {
    gamma += '1';
    omega += '0'
  }
});

console.log(gamma);
console.log(omega);

const gammaNum = parseInt(gamma, 2);
const omegaNum = parseInt(omega, 2);

console.log(gammaNum * omegaNum)
