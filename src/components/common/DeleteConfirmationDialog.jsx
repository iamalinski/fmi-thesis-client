import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";

// libraries
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

function DeleteConfirmationDialog({ onClose, onConfirm, isLoading }, ref) {
  const [open, setOpen] = useState(false);

  const entityIdRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: (entityId) => {
      setOpen(true);
      entityIdRef.current = entityId;
    },
    close: () => {
      setOpen(false);
      entityIdRef.current = null;
    },
  }));

  function handleConfirm() {
    onConfirm(entityIdRef.current);
    entityIdRef.current = null;
  }

  function handleClose() {
    onClose?.();
    setOpen(false);
    entityIdRef.current = null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Потвърждение за изтриване
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Това действие не може да бъде отменено.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отказ
        </Button>
        <Button onClick={handleConfirm} color="error" autoFocus>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={26} sx={{ color: "error" }} />
            </Box>
          ) : (
            "Изтрий"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default forwardRef(DeleteConfirmationDialog);
