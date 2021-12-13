const fs = require('fs');
const input = fs
    .readFileSync('./d13.input', 'utf-8')
    .split(/\r?\n/)
    .filter(i => i)

const prettyPrint = paper => {
  paper.forEach(row => {
    console.log(row.map(i => i ? '#' : '.').join(''))
  })
};

const positions = input
  .filter(i => i.indexOf('fold along'))
  .map(i => i.split(',').map(Number))

const instructions = input
  .filter(i => !i.indexOf('fold along'))
  .map(i => i.replace('fold along ', '').split('='));

const maxes = positions.reduce(
  (acc, [x, y]) => ({ x: Math.max(acc.x, x), y: Math.max(acc.y, y) }),
  { x: -1, y: - 1}
)

const paper = Array.from(Array(maxes.y + 1))
  .map(_ => ([ ...Array.from(Array(maxes.x + 1)).fill(false) ]));


const marked = positions.reduce((acc, [x, y]) => {
  acc[y][x] = true
  return acc
}, paper)


const performInstructions = (instructions, paper) => {
  return instructions.reduce((acc, [ direction, _line ]) => {
    const line = Number(_line);
    if (direction === 'y') {
      const top = acc.slice(0, line)
      const bottom = acc.slice(line + 1  , acc.length);

      bottom.reverse();

      return top.map((row, i) => row.map((cell, j) => cell || bottom[i][j]));
    }

    if (direction === 'x') {
      const both = acc.map(i => [ i.slice(0, line), i.slice(line + 1, i.length )])

      const left = both.map(([ left, _ ]) => left)
      const right = both.map(([ _, right ]) => right).map(right => {
        right.reverse();

        return right;
      })

      const result = left.map((row, i) => row.map((cell, j) => cell || right[i][j]));

      return result;
    }

    return acc;
  }, paper);
};

const folded = performInstructions(instructions, marked);

let count = 0;

folded.forEach((item, i) => {
  item.forEach((cell, i) => {
    if (cell) {
      count = count + 1;
    }
  });
});

prettyPrint(folded);
