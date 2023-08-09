import { configureStore } from "@reduxjs/toolkit";
import { boardReducer } from "./components/Board/boardSlice";
import { gameReducer } from "./components/Game/gameSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
