import cls from "./RemainderIndicator.module.css";
import { useSelector } from "react-redux";
import { boardCells } from "../Board/boardSlice";
import { useEffect, useState } from "react";
import classNames from "classnames";

interface NumberToolbarProps {
  className?: string;
}

export const RemainderIndicator = (props: NumberToolbarProps) => {
  const { className } = props;
  const cells = useSelector(boardCells);

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

  return (
    <div>
      {new Array(9).fill(0).map((item, index) => {
        const remainder = 9 - (usedNumbers.get(index + 1) || 0);
        return (
          <div
            key={index}
            className={classNames(cls.cell, {
              [cls.completed]: remainder === 0,
            })}
          >
            {index + 1}
            <span className={cls.hint}>{remainder}</span>
          </div>
        );
      })}
    </div>
  );
};
