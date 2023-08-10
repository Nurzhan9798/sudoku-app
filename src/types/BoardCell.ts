export interface BoardCell {
  value: number;
  userValue?: number;
  isPreFilled?: boolean;
  notes: number[];
}
