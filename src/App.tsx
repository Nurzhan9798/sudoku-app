import cls from "./App.module.css";
import { Game } from "./components/Game/Game";

export const App = () => {
  return (
    <div className={cls.App}>
      <Game />
    </div>
  );
};
