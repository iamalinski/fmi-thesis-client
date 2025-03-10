import React from "react";
import { Box, CircularProgress, Typography, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";

// Logo pulse animation
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Fade in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled components
const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: theme.palette.background.default,
  animation: `${fadeIn} 0.6s ease-out`,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(5),
  animation: `${pulse} 2s infinite ease-in-out`,
}));

const LoadingIndicator = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const Logo = styled("div")(({ theme }) => ({
  width: 180,
  height: 120,
  borderRadius: "15%",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 20%, ${theme.palette.primary.dark} 80%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  marginBottom: theme.spacing(2),
}));

export default function InitialLoading() {
  return (
    <LoadingContainer>
      <LogoContainer>
        {/* Replace with your actual logo */}
        <Logo>
          <Typography
            variant="h2"
            component="span"
            sx={{
              color: "white",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              userSelect: "none",
            }}
          >
            ФМИ
          </Typography>
        </Logo>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.text.primary,
            letterSpacing: "0.5px",
            marginTop: 1,
          }}
        >
          Дипломна работа
        </Typography>
      </LogoContainer>

      <LoadingIndicator>
        <CircularProgress
          size={40}
          thickness={4}
          sx={{
            color: (theme) => theme.palette.primary.main,
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            fontWeight: 500,
            letterSpacing: "0.3px",
            mt: 1,
          }}
        >
          Зареждане...
        </Typography>
      </LoadingIndicator>

      {/* Optional version info */}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 24,
          color: "text.secondary",
          opacity: 0.7,
        }}
      >
        v1.0.0
      </Typography>
    </LoadingContainer>
  );
}
