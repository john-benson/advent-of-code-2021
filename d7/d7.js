const fs = require('fs');

const positions = fs
    .readFileSync('./d7.input', 'utf-8')
    .split(',')
    .map(Number);

const minPosition = Math.min(...positions);
const maxPosition = Math.max(...positions);

let minCost = Number.MAX_VALUE;

const triangle = n => {
  return (n * (n + 1)) / 2
}

for (let i = minPosition; i <= maxPosition; i++){
  //console.log(`Try position ${i}`)

  const res = positions.reduce(
    (acc, cur) => triangle(Math.abs(cur - i)) + acc, 0
  )

  //console.log(`Cost ${res}`)
  if (res < minCost) {
    minCost = res;
  }

}

console.log(minCost)
