const fs = require('fs');
const input = fs
    .readFileSync('./d14.input', 'utf-8')
    .split(/\r?\n/)
    .filter(i => i);


const initialState = input[0];

const transformers = Object
  .fromEntries(input.slice(1, input.length)
  .map(i => i.split(' -> ')));

console.log(initialState, transformers);

const step = (state, transformers) => {
  let next = '';

  console.time("step");

  state.split('').forEach(char => {
    const previous = next.at(-1)

    if (!previous) {
      next += char
      return
    }

    const filler = transformers[`${previous}${char}`];

    if (filler) {
      next += `${filler}${char}`
      return
    }

    return next += char
  });

  console.timeEnd("step")

  return next;
}

let state = initialState;

for (let i = 0; i < 4; i++) {
  state = step(state, transformers)
  console.log(state);
}
