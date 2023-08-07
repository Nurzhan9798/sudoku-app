import cls from "./Cell.module.css";
import { CellInterface } from "../../types/CellInterface";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  boardActions,
  boardSelectedCell,
  boardSelectedColumn,
  boardSelectedRow,
} from "../Board/boardSlice";
import classNames from "classnames";
import { useSelector } from "react-redux";

interface CellProps {
  cell: CellInterface;
  row: number;
  column: number;
}

export const Cell = (props: CellProps) => {
  const { cell, column, row } = props;
  const [value, setValue] = useState<string | number>("");
  const dispatch = useAppDispatch();
  const selectedRow = useSelector(boardSelectedRow);
  const selectedColumn = useSelector(boardSelectedColumn);
  const cellGroup = Math.floor(row / 3) * 3 + Math.floor(column / 3 + 1);
  const selectedCellGroup =
    Math.floor(selectedRow / 3) * 3 + Math.floor(selectedColumn / 3 + 1);
  const isSelected = selectedRow === row && selectedColumn === column;

  const selectedCell = useSelector(boardSelectedCell);
  const selectedCellValue = selectedCell.readonly
    ? selectedCell.value
    : selectedCell.userValue;

  const isRelativeValue = cell.readonly
    ? selectedCellValue === cell.value
    : cell.userValue
    ? selectedCellValue === cell.userValue
    : false;

  const isRelativeCell = useMemo(() => {
    const isRelativeRow = selectedRow === row;
    const isRelativeColumn = selectedColumn === column;
    const isRelativeGroup = cellGroup === selectedCellGroup;

    return isRelativeRow || isRelativeColumn || isRelativeGroup;
  }, [cellGroup, column, row, selectedCellGroup, selectedColumn, selectedRow]);

  const isError = useMemo(() => {
    if (!cell.readonly && cell.userValue) {
      return cell.userValue !== cell.value;
    }
    return false;
  }, [cell.readonly, cell.userValue, cell.value]);

  useEffect(() => {
    if (cell.readonly) {
      setValue(cell.value);
    } else if (cell.userValue && cell.userValue > 0) {
      setValue(cell.userValue);
    } else {
      setValue("");
    }
  }, [cell.readonly, cell.userValue, cell.value]);

  const onClick = () => {
    dispatch(boardActions.setSelectedRow(row));
    dispatch(boardActions.setSelectedColumn(column));
  };

  return (
    <div
      className={classNames(cls.Cell, {
        [cls.selected]: isSelected,
        [cls.relativeCell]: isRelativeCell,
        [cls.relativeValue]: isRelativeValue,
        [cls.error]: isError,
        [cls.userValue]: !cell.readonly,
        [cls.columnDivider]: column % 3 === 0,
        [cls.rowDivider]: row % 3 === 0,
        [cls.lastColumn]: column === 8,
        [cls.lastRow]: row === 8,
      })}
      onClick={onClick}
    >
      {value}
    </div>
  );
};
