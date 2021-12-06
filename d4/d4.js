const fs = require('fs');

const input = fs.readFileSync('./d4.input', 'utf-8')
  .split(/\r?\n/)

const getBingoNumbers = ([ numbers ]) => numbers.split(',').map(Number)

const getBingoBoards = ([ _, ...boards ]) =>
    boards
        .map(row => row && row.split(' ').filter(i => i).map(i => i))
        .reduce((acc, row) => !row ? [ ...acc, [] ] : [ ...acc.slice(0, -1), [ ...acc[acc.length - 1], row ] ], []);


const numbers = getBingoNumbers(input); 
const boards = getBingoBoards(input);

console.log(boards);

const isBoardDone = board => {
    const columnLength = board.length;
    const rowLength = board[0].length;

    for (let column = 0; column < columnLength; column++) {
        let totalMarked = 0;
        for (let row = 0; row < rowLength; row++) {
            if (board[row][column].marked) {
                totalMarked++
            }

            if (totalMarked == rowLength) {
                return true;
            }
        }
    }

    for (let row = 0; row < rowLength; row++) {
        let totalMarked = 0;
        for (let column = 0; column < columnLength; column++) {
            if (board[row][column].marked) {
                totalMarked++;
            }

            if (totalMarked == columnLength) {
                return true;
            }
        }
    } 

    return false;
}

const findWinningBoard = (boards, numbers) => {

    for (number of numbers) {
        for (let boardIdx = 0; boardIdx < boards.length; boardIdx++) {
            const board = boards[boardIdx];
            for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
                let row = board[rowIdx];
                for (let cellIdx = 0; cellIdx < row.length; cellIdx++){
                    let cell = row[cellIdx];
                    if (cell.value == number) {
                        cell.marked = true
                    }
                }
            }
            
            if (isBoardDone(board)) {
                return { board, lastNumber: number }
            }
        } 
    }

    return { failed: true }
}

const findLastWinningBoard = (boards, numbers) => {
    const boardTracker = boards.map((_, idx ) => ({ idx, done: false }));


    for (let number of numbers) {
        for (let board of boards) {
            for (let row of board) {
                for (let cell of row){
                    if (cell.value == number) {
                        cell.marked = true
                    }
                }
            }
            
            if (isBoardDone(board)) {
                boardTracker[boards.indexOf(board)].done = true;

                const remaingBoards = boardTracker.filter(status => !status.done);

                if (remaingBoards.length === 0) {
                    return { board: board, lastNumber: number }
                }
            }
        } 
    }

    return { failed: true }
}

const { lastNumber, board, failed } = findLastWinningBoard(boards, numbers);


const scoreBoard = (lastNumber, board) => {
    let boardScore = 0;
    for (row of board) {
        for (cell of row) {
            if (!cell.marked) {
                boardScore += Number(cell.value);
            }
        }
    }
    return boardScore * lastNumber;
}

console.log(scoreBoard(lastNumber, board))