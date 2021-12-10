const fs = require('fs');
const input = fs
    .readFileSync('./d10.input', 'utf-8')
    .split(/\r?\n/)
    .filter(i => i.length > 0)
    .map(i => i.split(''));

const PAIRS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const SCORES = {
  '}': 3,
  ')': 1,
  ']': 2,
  '>': 4
}

const OG_SCORES = {
  '}': 1197,
  ')': 3,
  ']': 57,
  '>': 25137
}

const solve = (brackets) => {

  let stack = [];

  for (bracket of brackets) {
    const right = PAIRS[bracket];

    if (right) {
      stack.push(right);

    } else {
      expected = stack.pop();
      if (expected != bracket) {
        return bracket
      }
    }
  }

  return null;
}

const fix = (brackets) => {

  let isCorrupt = false;
  let stack = [];
  let toAdd = [];

  for (bracket of brackets) {
    const right = PAIRS[bracket];

    if (right) {
      stack.push(right);

    } else {
      expected = stack.pop();

      if (expected != bracket) {
        isCorrupt = true;
      }
    }
  }

  if (isCorrupt) {
    return []
  }

  stack.reverse();

  return stack;
}

scores = input.map(fix)
  .filter(i => i.length != 0)
  .map(i => i.reduce((acc, cur) => (acc * 5) + (SCORES[cur]), 0));

scores.sort((a,b) => a-b)

console.log(
  scores[Math.round((scores.length - 1)/2)]
)
