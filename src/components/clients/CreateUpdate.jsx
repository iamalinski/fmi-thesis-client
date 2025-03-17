import { useImperativeHandle, useState, forwardRef } from "react";

//libraries
import {
  Box,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

//hooks
import { useCreateClient } from "@hooks/clients/useClients";

const INITIAL_CLIENT_DATA = {
  id: null,
  name: "",
  number: "",
  vatNumber: "",
  accPerson: "",
  address: "",
};

const SnackbarAlert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateUpdateClient({}, ref) {
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [clientData, setClientData] = useState(INITIAL_CLIENT_DATA);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useImperativeHandle(ref, () => ({
    open: (id) => {
      setClientData((prev) => ({
        ...prev,
        id,
      }));
      setClientFormOpen(true);
    },
  }));

  function handleCloseForm() {
    setClientFormOpen(false);
    setClientData(INITIAL_CLIENT_DATA);
    setFormErrors({});
    setError("");
  }

  const handleClientDataChange = (e) => {
    const { name, value } = e.target;

    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createClientMutation = useCreateClient({
    onSuccess: () => {
      setSuccessSnackbarOpen(true);
      handleCloseForm();
    },
    onError: (error) => {
      let errorMessage = "Възникна грешка";

      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const mappedErrors = {};

        Object.keys(backendErrors).forEach((key) => {
          mappedErrors[key] = backendErrors[key][0];
        });

        setFormErrors(mappedErrors);
      } else {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
        setError(errorMessage);
      }
    },
  });

  const handleSaveClient = () => {
    createClientMutation.mutate({
      name: clientData.name,
      number: clientData.number,
      vat_number: clientData.vatNumber,
      acc_person: clientData.accPerson,
      address: clientData.address,
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={clientFormOpen}
        onClose={handleCloseForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {clientData.id ? "Редактиране на клиент" : "Нов клиент"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 4,
                    borderRadius: 3,
                    animation: "fadeIn 0.4s ease-out",
                    "@keyframes fadeIn": {
                      from: { opacity: 0, transform: "translateY(-8px)" },
                      to: { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                  xs={12}
                  md={12}
                >
                  {error}
                </Alert>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Фирма"
                  name="name"
                  value={clientData.name}
                  onChange={handleClientDataChange}
                  required
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="ЕИК"
                  name="number"
                  value={clientData.number}
                  onChange={handleClientDataChange}
                  required
                  error={!!formErrors.number}
                  helperText={formErrors.number}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="ДДС номер"
                  name="vatNumber"
                  value={clientData.vatNumber}
                  onChange={handleClientDataChange}
                  error={!!formErrors.vatNumber}
                  helperText={formErrors.vatNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="МОЛ"
                  name="accPerson"
                  value={clientData.accPerson}
                  onChange={handleClientDataChange}
                  required
                  error={!!formErrors.accPerson}
                  helperText={formErrors.accPerson}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Адрес"
                  name="address"
                  value={clientData.address}
                  onChange={handleClientDataChange}
                  required
                  error={!!formErrors.address}
                  helperText={formErrors.address}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} variant="outlined">
            Отказ
          </Button>
          <Button
            onClick={handleSaveClient}
            variant="contained"
            disabled={
              !clientData.name ||
              !clientData.number ||
              !clientData.accPerson ||
              !clientData.address ||
              createClientMutation.isPending
            }
          >
            {createClientMutation.isPending ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={26} sx={{ color: "#fff" }} />
              </Box>
            ) : (
              "Запази"
            )}
          </Button>
        </DialogActions>
      </Dialog>
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
          Клиента беше запазен успешно!
        </SnackbarAlert>
      </Snackbar>
    </>
  );
}

export default forwardRef(CreateUpdateClient);
