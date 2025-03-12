import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Alert,
  CircularProgress,
  Box,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { useAuth } from "@contexts/AuthContext";
import { useUpdatePersonalInfo } from "@hooks/profile/useProfile";

// Create custom Alert component for Snackbar
const SnackbarAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PersonalInfo() {
  const { user } = useAuth();

  const [personalInfo, setPersonalInfo] = useState(user);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Add state for success snackbar
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;

    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const savePersonalInfoMutation = useUpdatePersonalInfo({
    onSuccess: () => {
      // Show success snackbar
      setSuccessSnackbarOpen(true);
    },
    onError: (error) => {
      let errorMessage = "Възникна грешка";

      if (error.response?.data?.errors) {
        // Map backend validation errors to form fields
        const backendErrors = error.response.data.errors;
        const mappedErrors = {};

        Object.keys(backendErrors).forEach((key) => {
          mappedErrors[key] = backendErrors[key][0];
        });

        setFormErrors(mappedErrors);
      } else {
        // Try to extract error message
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
        setError(errorMessage);
      }
    },
  });

  const handleSavePersonalInfo = () => {
    setError("");

    savePersonalInfoMutation.mutate({
      id: user.id,
      data: personalInfo,
    });
  };

  // Handle closing the success snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  return (
    <>
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
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 150,
              height: 150,
              fontSize: "3rem",
              mb: 2,
              position: "relative",
              bgcolor: "primary.main",
            }}
          >
            {personalInfo.first_name?.charAt(0)}
            {personalInfo.last_name?.charAt(0)}
          </Avatar>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 1 }}
          >
            Променяйки личната си информация, тя ще се отрази на всички
            документи
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Име"
                name="first_name"
                value={personalInfo.first_name}
                onChange={handlePersonalInfoChange}
                variant="outlined"
                size="small"
                error={!!formErrors.first_name}
                helperText={formErrors.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Фамилия"
                name="last_name"
                value={personalInfo.last_name}
                onChange={handlePersonalInfoChange}
                variant="outlined"
                size="small"
                error={!!formErrors.last_name}
                helperText={formErrors.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Имейл"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                variant="outlined"
                size="small"
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={
                  !savePersonalInfoMutation.isPending ? <SaveIcon /> : <></>
                }
                onClick={handleSavePersonalInfo}
                sx={{ mt: 2 }}
              >
                {savePersonalInfoMutation.isPending ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress
                      size={26}
                      sx={{ mr: 1.5, color: "#fff" }}
                    />
                    Запазване...
                  </Box>
                ) : (
                  "Запази промените"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
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
          Данните бяха запазени успешно!
        </SnackbarAlert>
      </Snackbar>
    </>
  );
}
