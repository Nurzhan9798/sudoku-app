import cls from "./SelectDifficulty.module.css";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import { Button, ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { gameActions, gameDifficulty } from "../Game/gameSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const difficulties: Difficulty[] = ["easy", "medium", "hard", "expert"];
export const SelectDifficulty = () => {
  const difficulty = useSelector(gameDifficulty);
  const dispatch = useAppDispatch();

  const onDifficultyChange = (dif: Difficulty) => {
    dispatch(gameActions.setDifficulty(dif));
  };

  return (
    <ButtonGroup className={cls.SelectDifficulty}>
      {difficulties.map((item) => (
        <Button
          className={cls.item}
          onClick={() => onDifficultyChange(item)}
          variant={item === difficulty ? "contained" : "outlined"}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
};
