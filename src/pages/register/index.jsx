import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
  useTheme,
  CircularProgress,
  Grid,
  Avatar,
  styled,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from "@mui/material";
import {
  Lock,
  Email,
  Visibility,
  VisibilityOff,
  Person,
  HowToReg,
  ArrowForward,
  ArrowBack,
  Business,
  Badge,
  HomeWork,
  Phone,
  AccountBalance,
} from "@mui/icons-material";
import { useRegister } from "@hooks/register/useRegister";
import api from "@helpers/axios";
import { useNavigate } from "react-router-dom";

// Custom styled components for enhanced visual appeal
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  width: "100%",
  backgroundColor: "#FFFFFF",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
    "&.Mui-focused": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
  },
}));

export default function Register() {
  const navigate = useNavigate();

  // State for active tab
  const [activeTab, setActiveTab] = useState(0);

  // Form data state
  const [formData, setFormData] = useState({
    // User data
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",

    // Company data
    company: {
      name: "",
      eik: "",
      vat_number: "",
      address: "",
      phone: "",
      email: "",
      bank_name: "",
      bank_account: "",
      mol: "",
    },
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const theme = useTheme();

  // Register mutation for final step
  const registerMutation = useRegister({
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      let errorMessage = "Възникна грешка при регистрацията";
    
      if (error.response?.data?.errors) {
        // Map backend validation errors to form fields
        const backendErrors = error.response.data.errors;
        const mappedErrors = {};
        console.log(backendErrors);
        // Map backend error keys to form field names
        Object.keys(backendErrors).forEach((key) => {
          if (key === "first_name")
            mappedErrors.firstName = backendErrors[key][0];
          else if (key === "last_name")
            mappedErrors.lastName = backendErrors[key][0];
          else if (key === "email") mappedErrors.email = backendErrors[key][0];
          else if (key === "password")
            mappedErrors.password = backendErrors[key][0];
          else if (key.startsWith("company.")) {
            mappedErrors[key] = backendErrors[key][0];
          }
        });

        // Map erros for the second step

        setFormErrors(mappedErrors);

        // If there are errors in the first step, go back to step 1
        if (
          mappedErrors.firstName ||
          mappedErrors.lastName ||
          mappedErrors.email ||
          mappedErrors.password
        ) {
          setActiveTab(0);
        }
      } else {
        // Try to extract error message
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
        setError(errorMessage);
      }
    },
  });

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("company.")) {
      // Handle company data fields
      const companyField = name.split(".")[1];
      setFormData({
        ...formData,
        company: {
          ...formData.company,
          [companyField]: value,
        },
      });
    } else {
      // Handle user data fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear specific field error when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  // Validate first step with backend
  const validateFirstStep = async () => {
    setIsValidating(true);
    setError("");

    try {
      // Send data to backend validation endpoint
      await api.post("/register-check-user-data", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      });

      // If validation passes, proceed to next step
      setActiveTab(1);
      setFormErrors({});
    } catch (error) {
      console.log("Validation error:", error);

      if (error.response?.data?.errors) {
        // Map backend validation errors to form fields
        const backendErrors = error.response.data.errors;
        const mappedErrors = {};

        // Map backend error keys to form field names
        Object.keys(backendErrors).forEach((key) => {
          if (key === "first_name")
            mappedErrors.firstName = backendErrors[key][0];
          else if (key === "last_name")
            mappedErrors.lastName = backendErrors[key][0];
          else if (key === "email") mappedErrors.email = backendErrors[key][0];
          else if (key === "password")
            mappedErrors.password = backendErrors[key][0];
          else if (key === "password_confirmation")
            mappedErrors.passwordConfirmation = backendErrors[key][0];
        });

        setFormErrors(mappedErrors);
      } else {
        // General error
        setError(
          error.response?.data?.message ||
            "Валидацията на данните беше неуспешна."
        );
      }
    } finally {
      setIsValidating(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // If on first step, validate with backend
    if (activeTab === 0) {
      validateFirstStep();
      return;
    }

    // On second step, submit the complete form
    registerMutation.mutate({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      company: {
        name: formData.company.name,
        eik: formData.company.eik,
        vat_number: formData.company.vat_number || null,
        address: formData.company.address,
        phone: formData.company.phone || null,
        email: formData.company.email || null,
        bank_name: formData.company.bank_name || null,
        bank_account: formData.company.bank_account || null,
        mol: formData.company.mol,
      },
    });
  };

  // Return to first step
  const handleBack = () => {
    setActiveTab(0);
    setFormErrors({});
  };

  // Steps display
  const steps = ["Лична информация", "Фирмена информация"];

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        sx={{ position: "relative" }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -40,
            right: -100,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, rgba(255,255,255,0) 70%)`,
            opacity: 0.6,
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            left: -80,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, rgba(255,255,255,0) 70%)`,
            opacity: 0.5,
            zIndex: -1,
          }}
        />

        <StyledPaper elevation={0}>
          {/* Modern header section */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              pt: 3,
              pb: 6,
              px: 3,
              textAlign: "center",
              background: `radial-gradient(circle at top right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
            }}
          >
            {/* Decorative shapes */}
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 30,
                right: 20,
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            />

            <Avatar
              sx={{
                bgcolor: "white",
                width: 80,
                height: 80,
                margin: "0 auto",
                mb: 1,
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                border: "4px solid rgba(255,255,255,0.3)",
              }}
            >
              {activeTab === 0 ? (
                <HowToReg
                  fontSize="large"
                  style={{ color: theme.palette.primary.main, fontSize: 42 }}
                />
              ) : (
                <Business
                  fontSize="large"
                  style={{ color: theme.palette.primary.main, fontSize: 42 }}
                />
              )}
            </Avatar>
            <Typography
              variant="h3"
              component="h1"
              color="white"
              fontWeight="600"
              sx={{ letterSpacing: 0.5 }}
            >
              Регистрация
            </Typography>
            <Typography
              color="white"
              variant="subtitle1"
              sx={{ opacity: 0.9, fontWeight: 300, letterSpacing: 0.5 }}
            >
              {activeTab === 0
                ? "Създайте акаунт и започнете"
                : "Въведете фирмени данни"}
            </Typography>
          </Box>

          <Box
            sx={{
              p: { xs: 3, sm: 5 },
              pb: { xs: 4, sm: 6 },
              background: "#ffffff",
            }}
          >
            {/* Error display */}
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
              >
                {error}
              </Alert>
            )}

            {/* Steps indicator */}
            <Stepper activeStep={activeTab} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit}>
              {/* First step - Personal Information */}
              {activeTab === 0 && (
                <>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="Име"
                        variant="outlined"
                        fullWidth
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!formErrors.firstName}
                        helperText={formErrors.firstName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person
                                sx={{ color: theme.palette.primary.main }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="Фамилия"
                        variant="outlined"
                        fullWidth
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!formErrors.lastName}
                        helperText={formErrors.lastName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person
                                sx={{ color: theme.palette.primary.main }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <StyledTextField
                    label="Е-поща"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    sx={{ mt: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <StyledTextField
                    label="Парола"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    sx={{ mt: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <StyledTextField
                    label="Потвърди парола"
                    type={showConfirmPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                    error={!!formErrors.passwordConfirmation}
                    helperText={formErrors.passwordConfirmation}
                    sx={{ mt: 3, mb: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}

              {/* Second step - Company Information */}
              {activeTab === 1 && (
                <>
                  <StyledTextField
                    label="Име на фирма"
                    variant="outlined"
                    fullWidth
                    required
                    name="company.name"
                    value={formData.company.name}
                    onChange={handleChange}
                    error={!!formErrors["company.name"]}
                    helperText={formErrors["company.name"]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business
                            sx={{ color: theme.palette.primary.main }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid container spacing={2.5} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="ЕИК/Булстат"
                        variant="outlined"
                        fullWidth
                        required
                        name="company.eik"
                        value={formData.company.eik}
                        onChange={handleChange}
                        error={!!formErrors["company.eik"]}
                        helperText={formErrors["company.eik"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Badge
                                sx={{ color: theme.palette.primary.main }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="ДДС номер"
                        variant="outlined"
                        fullWidth
                        name="company.vat_number"
                        value={formData.company.vat_number}
                        onChange={handleChange}
                        error={!!formErrors["company.vat_number"]}
                        helperText={formErrors["company.vat_number"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Badge
                                sx={{ color: theme.palette.primary.main }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <StyledTextField
                    label="Адрес"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="company.address"
                    value={formData.company.address}
                    onChange={handleChange}
                    error={!!formErrors["company.address"]}
                    helperText={formErrors["company.address"]}
                    sx={{ mt: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeWork
                            sx={{ color: theme.palette.primary.main }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Grid container spacing={2.5} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="Телефон"
                        variant="outlined"
                        fullWidth
                        name="company.phone"
                        value={formData.company.phone}
                        onChange={handleChange}
                        error={!!formErrors["company.phone"]}
                        helperText={formErrors["company.phone"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone
                                sx={{ color: theme.palette.primary.main }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="Бизнес имейл"
                        variant="outlined"
                        fullWidth
                        type="email"
                        name="company.email"
                        value={formData.company.email}
                        onChange={handleChange}
                        error={!!formErrors["company.email"]}
                        helperText={formErrors["company.email"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email
                                sx={{ color: theme.palette.primary.main }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2.5} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="Банка"
                        variant="outlined"
                        fullWidth
                        name="company.bank_name"
                        value={formData.company.bank_name}
                        onChange={handleChange}
                        error={!!formErrors["company.bank_name"]}
                        helperText={formErrors["company.bank_name"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountBalance
                                sx={{ color: theme.palette.primary.main }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="IBAN"
                        variant="outlined"
                        fullWidth
                        name="company.bank_account"
                        value={formData.company.bank_account}
                        onChange={handleChange}
                        error={!!formErrors["company.bank_account"]}
                        helperText={formErrors["company.bank_account"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountBalance
                                sx={{ color: theme.palette.primary.main }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <StyledTextField
                    label="МОЛ"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="company.mol"
                    value={formData.company.mol}
                    onChange={handleChange}
                    error={!!formErrors["company.mol"]}
                    helperText={formErrors["company.mol"]}
                    sx={{ mt: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}

              {/* Navigation buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    activeTab === 0 ? "flex-end" : "space-between",
                  mt: 4,
                }}
              >
                {activeTab === 1 && (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                    sx={{
                      py: 1.5,
                      px: 3,
                      borderRadius: 3,
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Назад
                  </Button>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isValidating || registerMutation.isPending}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "0.5s",
                    },
                    "&:hover": {
                      boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                      transform: "translateY(-2px)",
                      "&:before": {
                        left: "100%",
                      },
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                    },
                  }}
                  endIcon={
                    !(isValidating || registerMutation.isPending) && (
                      <ArrowForward />
                    )
                  }
                >
                  {isValidating || registerMutation.isPending ? (
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
                      {isValidating ? "Валидиране..." : "Регистриране..."}
                    </Box>
                  ) : activeTab === 0 ? (
                    "Продължи"
                  ) : (
                    "Регистрирай се"
                  )}
                </Button>
              </Box>

              <Divider
                sx={{
                  my: 4,
                  "&::before, &::after": {
                    borderColor: "rgba(0, 0, 0, 0.06)",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    px: 2,
                    fontWeight: "medium",
                  }}
                >
                  или
                </Typography>
              </Divider>

              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  background: "rgba(0,0,0,0.02)",
                }}
              >
                <Typography
                  variant="body1"
                  component="span"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  Вече имаш профил?{" "}
                </Typography>
                <Link
                  href="/login"
                  variant="body1"
                  underline="none"
                  sx={{
                    fontWeight: "600",
                    color: theme.palette.primary.main,
                    transition: "all 0.2s",
                    position: "relative",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: 0,
                      height: "2px",
                      bottom: -2,
                      left: 0,
                      background: theme.palette.primary.main,
                      transition: "width 0.3s ease",
                    },
                    "&:hover": {
                      color: theme.palette.primary.dark,
                      "&:after": {
                        width: "100%",
                      },
                    },
                  }}
                >
                  Влез в системата
                </Link>
              </Box>
            </form>
          </Box>
        </StyledPaper>
      </Box>
    </Container>
  );
}
