import cls from "./Board.module.css";
import { Cell } from "../Cell/Cell";
import { boardActions, boardCells, boardIsNoteMode } from "./boardSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { KeyboardEvent, useMemo } from "react";

interface BoardProps {
  className?: string;
}

export const Board = (props: BoardProps) => {
  const { className } = props;
  const board = useSelector(boardCells);
  const isNoteMode = useSelector(boardIsNoteMode);

  const dispatch = useAppDispatch();
  const options = useMemo<Set<string>>(() => {
    const set = new Set<string>();
    for (let i = 1; i <= 9; i++) {
      set.add(String(i));
    }
    return set;
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
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
          if (isNoteMode) {
            dispatch(boardActions.clearNotes());
          } else {
            dispatch(boardActions.clearUserValue());
          }
          break;
        case "n":
          dispatch(boardActions.toggleNoteMode());
          break;
      }
    }
  };

  return (
    <div className={cls.Board} onKeyDown={onKeyDown} tabIndex={0}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={cls.row}>
          {row.map((cell, columnIndex) => (
            <Cell
              key={columnIndex}
              row={rowIndex}
              column={columnIndex}
              cell={cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
