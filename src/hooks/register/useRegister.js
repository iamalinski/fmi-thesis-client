import { useMutation } from "@tanstack/react-query";
import api from "@helpers/axios";
import { useNavigate } from "react-router-dom";

export const useRegister = (options = {}) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      try {
        const response = await api.post("/register", userData);
        return response.data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Registration failed. Please try again.";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data, variables, context) => {
      // Redirect to login page after successful registration
      navigate("/login");

      // Call optional success callback
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error("Registration failed:", error.message);

      // Call optional error callback
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
