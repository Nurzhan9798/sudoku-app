import { CellInterface } from "../../types/CellInterface";
import { boardData } from "../../const/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface BoardState {
  selectedRow: number;
  selectedColumn: number;
  cells: CellInterface[][];
}

const initialState: BoardState = {
  cells: boardData,
  selectedRow: 0,
  selectedColumn: 0,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setSelectedRow: (state, action: PayloadAction<number>) => {
      state.selectedRow = action.payload;
    },
    setSelectedColumn: (state, action: PayloadAction<number>) => {
      state.selectedColumn = action.payload;
    },
    goToLeft: (state) => {
      state.selectedColumn =
        state.selectedColumn === 0 ? 0 : state.selectedColumn - 1;
    },
    goToRight: (state) => {
      state.selectedColumn =
        state.selectedColumn === 8 ? 8 : state.selectedColumn + 1;
    },
    goToUp: (state) => {
      state.selectedRow = state.selectedRow === 0 ? 0 : state.selectedRow - 1;
    },
    goToDown: (state) => {
      state.selectedRow = state.selectedRow === 8 ? 8 : state.selectedRow + 1;
    },
    setUserValue: (state, action: PayloadAction<number>) => {
      const row = state.selectedRow;
      const column = state.selectedColumn;

      if (!state.cells[row][column].readonly) {
        state.cells[row][column].userValue = action.payload;
      }
    },
    clearUserValue: (state) => {
      const row = state.selectedRow;
      const column = state.selectedColumn;

      if (!state.cells[row][column].readonly) {
        state.cells[row][column].userValue = undefined;
      }
    },
  },
});

export const { actions: boardActions, reducer: boardReducer } = boardSlice;
export const boardSelectedRow = (state: RootState) => state.board.selectedRow;
export const boardSelectedColumn = (state: RootState) =>
  state.board.selectedColumn;
export const boardSelectedCell = (state: RootState) =>
  state.board.cells[state.board.selectedRow][state.board.selectedColumn];
export const boardCells = (state: RootState) => state.board.cells;
