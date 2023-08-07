import { Board } from "../Board/Board";
import cls from "./Game.module.css";
import { RemainderIndicator } from "../RemainderIndicator/RemainderIndicator";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { boardActions } from "../Board/boardSlice";
import { boardData } from "../../const/data";

interface GameProps {
  className?: string;
}

export const Game = (props: GameProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(boardActions.initBoard(boardData));
  }, [dispatch]);

  return (
    <div className={cls.Game}>
      <h1>SUDOKU</h1>
      <div className={cls.main}>
        <Board />
        <RemainderIndicator />
      </div>
    </div>
  );
};
