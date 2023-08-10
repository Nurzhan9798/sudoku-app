import { Board } from "../Board/Board";
import cls from "./Game.module.css";
import { RemainderIndicator } from "../RemainderIndicator/RemainderIndicator";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { KeyboardEvent, useEffect, useState } from "react";
import { boardActions, boardCells, boardIsNoteMode } from "../Board/boardSlice";
import { generateSudokuBoard } from "../../helper/sudokuGenerator";
import { Toolbar } from "../Toolbar/Toolbar";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { SelectDifficulty } from "../SelectDifficulty/SelectDifficulty";
import { gameActions, gameDifficulty, gameIsPlayerWon } from "./gameSlice";
import { ResultModal } from "../ResultModal/ResultModal";

const valueOptions = new Set<string>([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]);

export const Game = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isNoteMode = useSelector(boardIsNoteMode);
  const cells = useSelector(boardCells);
  const difficulty = useSelector(gameDifficulty);
  const isPlayerWon = useSelector(gameIsPlayerWon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(boardActions.initBoard(generateSudokuBoard(difficulty)));
    dispatch(gameActions.initGame());
  }, [difficulty, dispatch]);

  useEffect(() => {
    let correctAnswer = 0;
    cells.forEach((row) => {
      row.forEach((column) => {
        if (column.isPreFilled) correctAnswer++;
        else if (column.userValue === column.value) correctAnswer++;
      });
    });
    if (correctAnswer === 81) {
      dispatch(gameActions.setGameCompleted(true));
      dispatch(gameActions.setPlayerWon(true));
      setIsModalOpen(true);
    }
  }, [cells, dispatch]);

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (valueOptions.has(e.key)) {
      if (isNoteMode) {
        dispatch(boardActions.setNoteValue(Number(e.key)));
      } else {
        dispatch(boardActions.setUserValue(Number(e.key)));
      }
    } else {
      switch (e.key) {
        case "ArrowDown":
          dispatch(boardActions.goToDown());
          break;
        case "ArrowUp":
          dispatch(boardActions.goToUp());
          break;
        case "ArrowLeft":
          dispatch(boardActions.goToLeft());
          break;
        case "ArrowRight":
          dispatch(boardActions.goToRight());
          break;
        case "Backspace":
          dispatch(boardActions.clearNotes());
          dispatch(boardActions.clearUserValue());
          break;
        case "n":
          dispatch(boardActions.toggleNoteMode());
          break;
      }
    }
  };

  return (
    <div className={cls.Game} onKeyDown={onKeyDown} tabIndex={0}>
      <Typography variant="h3">SUDOKU</Typography>
      <div className={cls.main}>
        <div className={cls.left}>
          <SelectDifficulty />
          <Board />
        </div>

        <div className={cls.right}>
          {/* TODO TIMER */}

          <Toolbar />
          <RemainderIndicator />
        </div>

        <ResultModal
          open={isModalOpen}
          onClose={onModalClose}
          isWinner={isPlayerWon}
        />
      </div>
    </div>
  );
};
