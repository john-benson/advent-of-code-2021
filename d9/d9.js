const fs = require('fs');
const input = fs
    .readFileSync('./d9.input', 'utf-8')
    .split(/\r?\n/)
    .map(i => i.split('').map(Number))
    .filter(i => i.length > 0)

const safeGet = (x, y, values, dne = 10) => {
  if (values[x] == undefined) {
    return dne;
  }

  if (values[x][y] == undefined) {
    return dne;
  }

  return values[x][y]
}

const findAllLowPoints = (values) => {
  const lowPoints = [];

  for (let x = 0; x < values.length; x++) {
    const row = values[x];
    for (let y = 0; y < row.length; y++) {
      const cell = row[y];

      const right = safeGet(x + 1, y, values)
      const left = safeGet(x - 1, y, values)
      const bottom = safeGet(x, y + 1, values)
      const top = safeGet(x, y - 1, values)

      if (cell < right && cell < left && cell < bottom && cell < top) {
        lowPoints.push(cell);
      }
    }
  }

  return lowPoints;
}

const calculateBasinSize = (values, x, y) => {
  const cell = values[x][y]

  if (cell === 9) {
    return [];
  }

  const right = safeGet(x + 1, y, values, -1)
  const left = safeGet(x - 1, y, values, -1)
  const bottom = safeGet(x, y + 1, values, -1)
  const top = safeGet(x, y - 1, values, -1)

  let currentCells = [`${y},${x}`];

  if (cell < right) {
    let cells = calculateBasinSize(values, x + 1, y);
    currentCells = new Set([ ...currentCells, ...cells ])
  }

  if (cell < left) {
    let cells = calculateBasinSize(values, x - 1, y);
    currentCells = new Set([ ...currentCells, ...cells ])
  }

  if (cell < bottom) {
    let cells = calculateBasinSize(values, x, y + 1);
    currentCells = new Set([ ...currentCells, ...cells ])
  }

  if (cell < top) {
    let cells = calculateBasinSize(values, x, y - 1);
    currentCells = new Set([ ...currentCells, ...cells ])
  }

  return [ ...currentCells ];

};

const findLargestBasins = (values) => {

  const basins = [ ];

  for (let x = 0; x < values.length; x++) {
    const row = values[x];
    for (let y = 0; y < row.length; y++) {
      const cell = row[y];

      const result = calculateBasinSize(values, x, y);

      if (result.length > 2) {
        basins.push(result)
      }

    }
  }

  const lengths = basins.map(i => i.length);
  lengths.sort((a,b) => b-a)
  const [ one, two, three ] = lengths

  return [ one, two, three ];
}

console.log(
findLargestBasins(input).reduce((acc, cur) => acc * cur)
)
//console.log(findAllLowPoints(input).reduce((acc, cur) => acc + cur + 1, 0))
