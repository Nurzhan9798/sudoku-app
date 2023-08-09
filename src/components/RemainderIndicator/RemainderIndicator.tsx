import cls from "./RemainderIndicator.module.css";
import { useSelector } from "react-redux";
import { boardActions, boardCells, boardIsNoteMode } from "../Board/boardSlice";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface NumberToolbarProps {
  className?: string;
}

export const RemainderIndicator = (props: NumberToolbarProps) => {
  const { className } = props;
  const cells = useSelector(boardCells);

  const isNoteMode = useSelector(boardIsNoteMode);
  const dispatch = useAppDispatch();

  const [usedNumbers, setUsedNumbers] = useState<Map<number, number>>(
    new Map(),
  );

  useEffect(() => {
    let newUsedNumbers = new Map<number, number>();
    cells.forEach((row) => {
      row.forEach((column) => {
        if (column.isPreFilled) {
          let key = column.value;
          let prevValue = newUsedNumbers.get(key) || 0;
          newUsedNumbers.set(key, prevValue + 1);
        } else if (column.userValue) {
          let key = column.userValue;
          let prevValue = newUsedNumbers.get(key) || 0;
          newUsedNumbers.set(key, prevValue + 1);
        }
      });
    });
    setUsedNumbers(newUsedNumbers);
  }, [cells]);

  const setValue = (value: number) => {
    if (isNoteMode) {
      dispatch(boardActions.setNoteValue(value));
    } else {
      dispatch(boardActions.setUserValue(value));
    }
  };

  return (
    <div className={cls.NumberToolbar}>
      {new Array(9).fill(0).map((item, index) => {
        const remainder = 9 - (usedNumbers.get(index + 1) || 0);
        return (
          <Button
            onClick={() => setValue(index + 1)}
            variant={remainder === 0 ? "contained" : "outlined"}
            disabled={remainder === 0}
            key={index}
            className={classNames(cls.cell, {
              [cls.completed]: remainder === 0,
            })}
          >
            {index + 1}
            <span className={cls.hint}>{remainder}</span>
          </Button>
        );
      })}
    </div>
  );
};
