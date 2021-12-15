const fs = require('fs');

const input = fs
    .readFileSync('./d14.input', 'utf-8')
    .split(/\r?\n/)
    .filter(i => i);

let initial = input[0].split('');

const transformers = Object.fromEntries(
  input.slice(1, input.length).map(i => i.split(' -> ')).map(([ pair, result ]) => (
    [ pair, [ `${pair[0]}${result}`, `${result}${pair[1]}` ] ]
  ))
);


const getCounts = (counts, transformers) => {
  const nextCounts = { };

  const pairs = Object.keys(counts);

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];

    const resultPairs = transformers[pair];

    if (resultPairs) {
      nextCounts[resultPairs[0]] = (nextCounts[resultPairs[0]] || 0) + counts[pair]
      nextCounts[resultPairs[1]] = (nextCounts[resultPairs[1]] || 0) + counts[pair]
    } else {
      nextCounts[pair] = (nextCounts[pair] || 0) + counts[pair]
    }
  }

  return nextCounts;
}

let counts = {

}

for (let i = 0; i < initial.length; i++) {
  if (i == 0 || i === initial.length) {
    continue;
  }

  const pair = initial[i - 1] + initial[i];

  counts[pair] = (counts[pair] || 0) + 1
}

console.log(counts);

const steps = 40;

for (let i = 0; i < steps; i++) {
  counts = getCounts(counts, transformers)
}

let result = {
};

//console.log(counts);

Object.entries(counts).forEach(([ pair, count ]) => {
  result[pair[1]] = (result[pair[1]] || 0) + count;
});

console.log(result)

const min = Math.min(...Object.values(result))
const max = Math.max(...Object.values(result))

console.log(max - min)
