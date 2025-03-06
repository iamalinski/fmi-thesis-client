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
} from "@mui/material";
import {
  Lock,
  Email,
  Visibility,
  VisibilityOff,
  Person,
  HowToReg,
  ArrowForward,
} from "@mui/icons-material";
import { useRegister } from "../../hooks/register/useRegister";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();

  const registerMutation = useRegister({
    onError: (error) => {
      setError(
        error.response?.data?.message || "Възникна грешка при регистрацията"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Паролите не съвпадат");
      return;
    }

    registerMutation.mutate({
      firstName,
      lastName,
      email,
      password,
    });
  };

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
              <HowToReg
                fontSize="large"
                style={{ color: theme.palette.primary.main, fontSize: 42 }}
              />
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
              Създайте акаунт и започнете вашето пътешествие
            </Typography>
          </Box>

          <Box
            sx={{
              p: { xs: 3, sm: 5 },
              pb: { xs: 4, sm: 6 },
              background: "#ffffff",
            }}
          >
            {error && (
              <Box
                sx={{
                  mb: 4,
                  p: 2.5,
                  bgcolor: "rgba(244, 67, 54, 0.08)",
                  borderRadius: 3,
                  border: "1px solid rgba(244, 67, 54, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  animation: "fadeIn 0.4s ease-out",
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "translateY(-8px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <Typography color="error.main" variant="body2" fontWeight="500">
                  {error}
                </Typography>
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    label="Име"
                    variant="outlined"
                    fullWidth
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: theme.palette.primary.main }} />
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: theme.palette.primary.main }} />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={registerMutation.isLoading}
                sx={{
                  mt: 5,
                  mb: 3,
                  py: 1.8,
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
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
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
                endIcon={!registerMutation.isLoading && <ArrowForward />}
              >
                {registerMutation.isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress
                      size={26}
                      color="inherit"
                      sx={{ mr: 1.5 }}
                    />
                  </Box>
                ) : (
                  "Регистрирай се"
                )}
              </Button>

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