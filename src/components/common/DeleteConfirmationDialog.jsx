import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

export default function DeleteConfirmationDialog({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Потвърждение за изтриване",
  itemName 
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 2,
          minWidth: 400,
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography>
          Сигурни ли сте, че искате да изтриете{' '}
          <Typography component="span" fontWeight={600}>
            {itemName}
          </Typography>
          ?
          Това действие не може да бъде отменено.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Отказ
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ textTransform: 'none' }}
        >
          Изтрий
        </Button>
      </DialogActions>
    </Dialog>
  );
} 