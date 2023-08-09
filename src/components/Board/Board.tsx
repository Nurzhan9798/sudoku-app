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

  const dispatch = useAppDispatch();

  return (
    <div className={cls.Board}>
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
