import { Board } from "../Board/Board";
import cls from "./Game.module.css";
import { RemainderIndicator } from "../RemainderIndicator/RemainderIndicator";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import { boardActions, boardCells, boardIsNoteMode } from "../Board/boardSlice";
import { generateSudokuBoard } from "../../helper/sudoku";
import { Toolbar } from "../Toolbar/Toolbar";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { SelectDifficulty } from "../SelectDifficulty/SelectDifficulty";
import { gameDifficulty } from "./gameSlice";

interface GameProps {
  className?: string;
}

export const Game = (props: GameProps) => {
  const { className } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isNoteMode = useSelector(boardIsNoteMode);
  const cells = useSelector(boardCells);
  const difficulty = useSelector(gameDifficulty);
  const dispatch = useAppDispatch();

  const checkGameCompleted = () => {
    let correctAnswer = 0;
    cells.forEach((row) => {
      row.forEach((column) => {
        if (column.isPreFilled) correctAnswer++;
        else if (column.userValue === column.value) correctAnswer++;
      });
    });
    if (correctAnswer === 81) {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const board = generateSudokuBoard(difficulty);
    dispatch(boardActions.initBoard(board));
  }, [difficulty, dispatch]);

  useEffect(() => {
    console.log("check completed");
    checkGameCompleted();
  }, [cells, checkGameCompleted]);

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const options = useMemo<Set<string>>(() => {
    const set = new Set<string>();
    for (let i = 1; i <= 9; i++) {
      set.add(String(i));
    }
    return set;
  }, []);
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (options.has(e.key)) {
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

          {/* TODO TOOL BAR*/}
          <Toolbar />

          {/* REMAINDER INDICATOR */}
          <RemainderIndicator />
        </div>

        {/*  TODO congrulation modal dialog*/}
      </div>
    </div>
  );
};
