import { useImperativeHandle, useState, forwardRef } from "react";

//libraries
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const SnackbarAlert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SuccessAlert({ text }, ref) {
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setSuccessSnackbarOpen(true);
    },
  }));

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  return (
    <Snackbar
      open={successSnackbarOpen}
      autoHideDuration={5000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <SnackbarAlert
        onClose={handleCloseSnackbar}
        severity="success"
        sx={{ width: "100%" }}
      >
        {text || "Успешно запазване!"}
      </SnackbarAlert>
    </Snackbar>
  );
}

export default forwardRef(SuccessAlert);
