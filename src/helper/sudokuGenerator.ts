import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import { getSudoku } from "sudoku-gen";
import { BoardCell } from "../types/BoardCell";

export const generateSudokuBoard = (level: Difficulty) => {
  const sudoku = getSudoku(level);
  const board: BoardCell[][] = [];
  for (let row = 0; row < 9; row++) {
    const boardRow: BoardCell[] = [];
    for (let column = 0; column < 9; column++) {
      boardRow.push({
        value: Number(sudoku.solution.charAt(row * 9 + column)),
        isPreFilled: sudoku.puzzle.charAt(row * 9 + column) !== "-",
        notes: [],
      });
    }
    board.push(boardRow);
  }
  return board;
};

// TODO custom implementation
// let rowNumbers: Map<number, Set<number>> = new Map();
// let columnNumbers: Map<number, Set<number>> = new Map();
// let groupNumbers: Map<number, Set<number>> = new Map();
// const generateGrid = (): number[][] => {
//   const grid: number[][] = [];
//   rowNumbers = new Map();
//   columnNumbers = new Map();
//   groupNumbers = new Map();
//
//   for (let row = 0; row < 9; row++) {
//     rowNumbers.set(row, new Set<number>());
//     columnNumbers.set(row, new Set<number>());
//     groupNumbers.set(row, new Set<number>());
//     const gridRow: number[] = [];
//
//     for (let column = 0; column < 9; column++) {
//       gridRow.push(0);
//     }
//     grid.push(gridRow);
//   }
//
//   backtracking(grid, 0);
//
//   return grid;
// };
//
// const backtracking = (grid: number[][], index: number) => {
//   if (index === 81) return;
//
//   let row = Math.floor(index / 9);
//   let column = index % 9;
//   let group = Math.floor(row / 3) * 3 + Math.floor(column / 3);
//
//   let generatedValue = Math.ceil(Math.random() * 9);
//
//   while (
//     rowNumbers.get(row)?.has(generatedValue) ||
//     columnNumbers.get(column)?.has(generatedValue) ||
//     groupNumbers.get(group)?.has(generatedValue)
//   ) {
//     generatedValue = Math.ceil(Math.random() * 9);
//   }
// };
