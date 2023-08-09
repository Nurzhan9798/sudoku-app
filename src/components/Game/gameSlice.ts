import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import { RootState } from "../../store";

export interface GameState {
  difficulty: Difficulty;
  isCompleted: boolean;
  hintNumber: number;
}

const initialState: GameState = {
  difficulty: "easy",
  isCompleted: false,
  hintNumber: 3,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
    setGameCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
    setHintNumber: (state, action: PayloadAction<number>) => {
      state.hintNumber = action.payload;
    },
    initGame: (state) => {
      state.hintNumber = 3;
      state.isCompleted = false;
    },
  },
});

export const { actions: gameActions, reducer: gameReducer } = gameSlice;

export const gameDifficulty = (state: RootState) => state.game.difficulty;
export const gameIsCompleted = (state: RootState) => state.game.isCompleted;
export const gameHintNumber = (state: RootState) => state.game.hintNumber;
