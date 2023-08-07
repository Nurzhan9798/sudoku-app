import cls from "./Board.module.css";
import { Cell } from "../Cell/Cell";
import {
  boardActions,
  boardCells,
  boardSelectedColumn,
  boardSelectedRow,
} from "./boardSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  EventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useMemo,
} from "react";

interface BoardProps {
  className?: string;
}

export const Board = (props: BoardProps) => {
  const { className } = props;
  const board = useSelector(boardCells);
  const selectedRow = useSelector(boardSelectedRow);
  const selectedColumn = useSelector(boardSelectedColumn);
  const selectedCellGroup =
    Math.floor(selectedRow / 3) * 3 + Math.floor(selectedColumn / 3);

  const dispatch = useAppDispatch();
  const options = useMemo<Set<string>>(() => {
    const set = new Set<string>();
    for (let i = 1; i <= 9; i++) {
      set.add(String(i));
    }
    return set;
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (options.has(e.key)) {
      dispatch(boardActions.setUserValue(Number(e.key)));
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
          dispatch(boardActions.clearUserValue());
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
