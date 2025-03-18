import {
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
  useEffect,
} from "react";

// libraries
import {
  Box,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Skeleton,
} from "@mui/material";

// hooks
import {
  useCreateClient,
  useClient,
  useUpdateClient,
} from "@hooks/clients/useClients";

// components
import SuccessAlert from "@components/common/SuccessAlert";

const INITIAL_CLIENT_DATA = {
  id: null,
  name: "",
  number: "",
  vatNumber: "",
  accPerson: "",
  address: "",
};

function CreateUpdateClient({}, ref) {
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [clientData, setClientData] = useState(INITIAL_CLIENT_DATA);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const successAlertRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: (id) => {
      setClientData((prev) => ({
        ...prev,
        id,
      }));
      setClientFormOpen(true);
    },
  }));

  const { data: clientDataFromApi, isLoading: isLoadingDataFromApi } =
    useClient(clientData.id || "", {
      enabled: !!clientData.id,
    });

  useEffect(() => {
    if (clientDataFromApi) {
      setClientData({
        id: clientDataFromApi.id,
        name: clientDataFromApi.name || "",
        number: clientDataFromApi.number || "",
        vatNumber: clientDataFromApi.vat_number || "",
        accPerson: clientDataFromApi.acc_person || "",
        address: clientDataFromApi.address || "",
      });
    }
  }, [clientDataFromApi]);

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
      successAlertRef.current.open();
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

  const updateClientMutation = useUpdateClient({
    onSuccess: () => {
      successAlertRef.current.open();
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
    if (clientData.id) {
      updateClientMutation.mutate({
        id: clientData.id,
        data: {
          name: clientData.name,
          number: clientData.number,
          vat_number: clientData.vatNumber,
          acc_person: clientData.accPerson,
          address: clientData.address,
        },
      });

      return;
    }

    createClientMutation.mutate({
      name: clientData.name,
      number: clientData.number,
      vat_number: clientData.vatNumber,
      acc_person: clientData.accPerson,
      address: clientData.address,
    });
  };

  function areAllFieldsDisabled() {
    return createClientMutation.isPending || updateClientMutation.isPending;
  }

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
          {isLoadingDataFromApi ? (
            <>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Skeleton variant="rounded" height={40} animation="wave" />
              </Grid>
              <Grid item xs={6} sx={{ mb: 2 }}>
                <Skeleton variant="rounded" height={40} animation="wave" />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Skeleton variant="rounded" height={40} animation="wave" />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rounded" height={40} animation="wave" />
              </Grid>
            </>
          ) : (
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
                    disabled={areAllFieldsDisabled()}
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
                    disabled={areAllFieldsDisabled()}
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
                    disabled={areAllFieldsDisabled()}
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
                    disabled={areAllFieldsDisabled()}
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
                    disabled={areAllFieldsDisabled()}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseForm}
            variant="outlined"
            disabled={areAllFieldsDisabled()}
          >
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
              areAllFieldsDisabled()
            }
          >
            {createClientMutation.isPending ||
            updateClientMutation.isPending ? (
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
      <SuccessAlert ref={successAlertRef} text="Запазването беше успешно!" />
    </>
  );
}

export default forwardRef(CreateUpdateClient);
