import cls from "./Toolbar.module.css";
import { useSelector } from "react-redux";
import { boardActions, boardIsNoteMode } from "../Board/boardSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Button, ButtonGroup } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { useCallback, useState } from "react";
import {
  gameActions,
  gameHintNumber,
  gameIsCompleted,
} from "../Game/gameSlice";

export const Toolbar = () => {
  const isNoteMode = useSelector(boardIsNoteMode);
  const isGameCompleted = useSelector(gameIsCompleted);
  const hintNumber = useSelector(gameHintNumber);
  const dispatch = useAppDispatch();

  const toggleMode = () => {
    dispatch(boardActions.toggleNoteMode());
  };

  const clearValues = useCallback(() => {
    dispatch(boardActions.clearUserValue());
    dispatch(boardActions.clearNotes());
  }, [dispatch]);

  const onHelpClick = useCallback(() => {
    if (!isGameCompleted && hintNumber > 0) {
      console.log(isGameCompleted, hintNumber);
      dispatch(boardActions.getHelp());
      dispatch(gameActions.setHintNumber(hintNumber - 1));
    }
  }, [dispatch, hintNumber, isGameCompleted]);

  return (
    <div className={cls.ToggleNoteMode}>
      <ButtonGroup>
        <Button
          onClick={toggleMode}
          variant={isNoteMode ? "contained" : "outlined"}
          color={"primary"}
        >
          <BorderColorIcon />
        </Button>
        <Button onClick={clearValues} variant={"outlined"} color={"primary"}>
          <DeleteIcon />
        </Button>
        <Button
          onClick={onHelpClick}
          variant={"outlined"}
          color={"primary"}
          disabled={isGameCompleted || hintNumber === 0}
        >
          <PsychologyAltIcon />
          {hintNumber}
        </Button>
      </ButtonGroup>
    </div>
  );
};
