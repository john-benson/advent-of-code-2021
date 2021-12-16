const fs = require('fs');

const _input = fs
    .readFileSync('./d15.input', 'utf-8')
    .split(/\r?\n/)
    .filter(i => i)
    .map(i => i.split('').map(Number));


const incrementBoard = input => {
  const nextBoard = [];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {

      if (nextBoard[row] === undefined) {
        nextBoard.push([])
      }

      const next = input[row][col] + 1;

      nextBoard[row].push(next === 10 ? 1 : next)
    }
  }

  return nextBoard;
}

const buildBoard = input => {

  let current = input;
  let total = 0;
  let finalBoard = [];

  for (let i = 0; i < 5; i++) {
    finalBoard = [ ...finalBoard, ...current ];
    //console.log('adding vert', i)
    total++;
    current = incrementBoard(current);
  }

  for (let row = 0; row < finalBoard.length; row++) {
    for (let i = 0; i < 4; i++) {
      const _row = finalBoard[row];

      const currentStart = input[0].length * i;
      //console.log('adding hori', i)
      total++;

      const elements = _row.slice(currentStart, currentStart + input[0].length)

      finalBoard[row] = [ ..._row, ...incrementBoard([ elements ])[0] ]
    }
  }
  //console.log(total);

  return finalBoard;

}


const Graph = require('node-dijkstra');

const route = new Graph();

const cellName = (row, col) => `${col},${row}`

const cost = (row, col, board) => board[row] && board[row][col]

const getAllPaths = (row, col, board) => {
  let paths = {};

  if (row > 0 && cost(row - 1, col, board)) {
    paths[cellName(row - 1, col)] = cost(row - 1, col, board);
  }

  if (row < board.length && cost(row + 1, col, board)) {
    paths[cellName(row + 1, col)] = cost(row + 1, col, board);
  }

  if (col > 0 && cost(row, col - 1, board)) {
    paths[cellName(row, col - 1)] = cost(row, col - 1, board);
  }

  if (col < board[0].length && cost(row, col + 1, board)) {
    paths[cellName(row, col + 1)] = cost(row, col + 1, board);
  }

  return paths;
}

const prettyPrint = board => {
  board.forEach(item => {
    console.log(item.join(''))
  })
}

board = buildBoard(_input)

//prettyPrint(board);


for (let row = 0; row < board.length; row++) {
  for (let col = 0; col < board[0].length; col++) {
    route.addNode(cellName(row, col), getAllPaths(row, col, board))
  }
}

const start = cellName(0, 0);
const end = cellName(board.length -1 , board[0].length -1 )

console.log(
  start, end,
  route.path(start, end, { cost: true })
)
