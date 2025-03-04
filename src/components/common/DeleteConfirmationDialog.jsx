import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

export default function DeleteConfirmationDialog({ open, onClose, onConfirm, itemName }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Потвърждение за изтриване
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Сигурни ли сте, че искате да изтриете {itemName}?
          Това действие не може да бъде отменено.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отказ
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Изтрий
        </Button>
      </DialogActions>
    </Dialog>
  );
} 