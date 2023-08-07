import cls from "./ToggleNoteMode.module.css";
import { useSelector } from "react-redux";
import { boardActions, boardIsNoteMode } from "../Board/boardSlice";
import classNames from "classnames";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface ToggleNoteModeProps {
  className?: string;
}

export const ToggleNoteMode = (props: ToggleNoteModeProps) => {
  const { className } = props;
  const isNoteMode = useSelector(boardIsNoteMode);
  const dispatch = useAppDispatch();

  const toggleMode = () => {
    dispatch(boardActions.toggleNoteMode());
  };

  return (
    <div className={cls.ToggleNoteMode}>
      <button
        onClick={toggleMode}
        className={classNames(cls.button, { [cls.active]: isNoteMode })}
      >
        Note Mode
      </button>
    </div>
  );
};
