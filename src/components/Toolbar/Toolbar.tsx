import cls from "./Toolbar.module.css";
import { useSelector } from "react-redux";
import { boardActions, boardIsNoteMode } from "../Board/boardSlice";
import classNames from "classnames";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Button, ButtonGroup } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

interface ToggleNoteModeProps {
  className?: string;
}

export const Toolbar = (props: ToggleNoteModeProps) => {
  const { className } = props;
  const isNoteMode = useSelector(boardIsNoteMode);
  const dispatch = useAppDispatch();

  const toggleMode = () => {
    dispatch(boardActions.toggleNoteMode());
  };

  const clearValues = () => {
    dispatch(boardActions.clearUserValue());
    dispatch(boardActions.clearNotes());
  };

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
      </ButtonGroup>
    </div>
  );
};
