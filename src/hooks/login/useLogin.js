import { useMutation } from "@tanstack/react-query";
import api from "@helpers/axios";
import { useNavigate } from "react-router-dom"; // If using react-router

// Helper function to handle auth token
const authToken = {
  set: (token) => localStorage.setItem("token", token),
  get: () => localStorage.getItem("token"),
  remove: () => localStorage.removeItem("token"),
};

export const useLogin = (options = {}) => {
  const navigate = useNavigate(); // If using react-router

  return useMutation({
    mutationFn: async (credentials) => {
      try {
        const response = await api.post("/login", credentials);
        return response.data;
      } catch (error) {
        // Enhanced error handling
        const errorMessage =
          error.response?.data?.message ||
          "Authentication failed. Please check your credentials.";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data, variables, context) => {
      // Save the token
      authToken.set(data.token);

      // Handle user data if available
      if (data.user) {
        // Optional: Store user data in a global state or context
      }

      // Redirect using react-router (preferred) or fallback to window.location
      if (navigate) {
        navigate(options.redirectTo || "/dashboard");
      } else {
        window.location.href = options.redirectTo || "/dashboard";
      }

      // Call optional success callback
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // Default error handling
      console.error("Login failed:", error.message);

      // Call optional error callback
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
