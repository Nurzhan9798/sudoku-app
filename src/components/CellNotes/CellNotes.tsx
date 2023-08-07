import cls from "./CellNotes.module.css";

interface CellNotesProps {
  className?: string;
  notes: number[];
}

export const CellNotes = (props: CellNotesProps) => {
  const { className, notes } = props;

  const getClassName = (noteIndex: number): string => {
    return `note${noteIndex}`;
  };
  return (
    <div className={cls.CellNotes}>
      {notes.map((note) => (
        <span key={note} className={cls[getClassName(note)]}>
          {note}
        </span>
      ))}
    </div>
  );
};
