import { Button, Modal, Paper, Typography } from "@mui/material";
import cls from "./ResultModal.module.css";

interface ResultModalProps {
  open: boolean;
  onClose: () => void;
  isWinner: boolean;
}

export const ResultModal = (props: ResultModalProps) => {
  const { open, onClose, isWinner } = props;
  const modalTitle = isWinner ? "Congratulations!" : "Better Luck Next Time!";
  const modalText = isWinner
    ? "You're the Sudoku champion! 🧩✨\nWell done on your puzzling triumph! 🏆🌟"
    : "Don't worry, keep practicing! 🧩💪";

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="result-modal"
      className={cls.ResultModal}
    >
      <Paper elevation={5} className={cls.paper}>
        <Typography variant="h5">{modalTitle}</Typography>
        <Typography variant="body1" gutterBottom>
          {modalText}
        </Typography>
        <Button variant="contained" onClick={onClose} color="primary">
          Close
        </Button>
      </Paper>
    </Modal>
  );
};
