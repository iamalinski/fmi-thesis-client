import { useMutation } from "@tanstack/react-query";
import api from "@helpers/axios";
import { useAuth } from "@contexts/AuthContext";

// Helper function to handle auth token - keeping this for compatibility
const authToken = {
  set: (token) => localStorage.setItem("token", token),
  get: () => localStorage.getItem("token"),
  remove: () => localStorage.removeItem("token"),
};

export const useLogin = (options = {}) => {
  const { setUser } = useAuth();

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
      // Save the token - keeping existing method
      authToken.set(data.token);

      // Update user in auth context
      if (data.user) {
        setUser(data.user);
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
