import cls from "./CellNotes.module.css";
import { useSelector } from "react-redux";
import { boardSelectedCell } from "../Board/boardSlice";
import classNames from "classnames";

interface CellNotesProps {
  notes: number[];
}

export const CellNotes = (props: CellNotesProps) => {
  const { notes } = props;
  const selectedCell = useSelector(boardSelectedCell);
  const selectedValue = selectedCell.isPreFilled
    ? selectedCell.value
    : selectedCell.userValue;

  const getClassName = (noteIndex: number): string => {
    return `note${noteIndex}`;
  };
  return (
    <div className={cls.CellNotes}>
      {notes.map((note) => (
        <span
          key={note}
          className={classNames(cls[getClassName(note)], {
            [cls.active]: note === selectedValue,
          })}
        >
          {note}
        </span>
      ))}
    </div>
  );
};
