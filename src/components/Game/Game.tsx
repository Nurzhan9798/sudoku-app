import { Board } from "../Board/Board";
import cls from "./Game.module.css";
import { NumberToolbar } from "../NumberToolbar/NumberToolbar";

interface GameProps {
  className?: string;
}

export const Game = (props: GameProps) => {
  const { className } = props;

  return (
    <div className={cls.Game}>
      <h1>SUDOKU</h1>
      <div className={cls.main}>
        <Board />
        <NumberToolbar />
      </div>
    </div>
  );
};
