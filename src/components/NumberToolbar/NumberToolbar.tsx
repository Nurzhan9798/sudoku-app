import cls from "./NumberToolbar.module.css";

interface NumberToolbarProps {
  className?: string;
}

export const NumberToolbar = (props: NumberToolbarProps) => {
  const { className } = props;

  return (
    <div>
      {new Array(9).fill(0).map((item, index) => (
        <div className={cls.cell}>
          {index}
          <span className={cls.hint}>{Math.floor(Math.random() * 10)}</span>
        </div>
      ))}
    </div>
  );
};
