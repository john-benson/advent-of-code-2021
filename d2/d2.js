const fs = require('fs');
const readline = require('readline');

input = fs.readFileSync('./d2.input', 'utf-8')
  .split(/\r?\n/)
  .map(line => line.split(' '))

let depth = 0;
let horizontal = 0;
let aim = 0;

input.forEach(([ action, _amount ]) => {
  amount = Number(_amount)

  if (action == 'forward') {
    horizontal += amount
    depth += (amount * aim)
  }

  if (action == 'down') {
      aim += amount
  }

  if (action == 'up') {
      aim -= amount
  }
})


console.log(depth)
console.log(horizontal)
console.log(aim)

console.log(depth * horizontal)
