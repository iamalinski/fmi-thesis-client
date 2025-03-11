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
        // Don't wrap the error response in a new Error
        // Instead, preserve the structure and throw the original error
        console.log("Registration API error:", error.response?.data);

        // If there are validation errors, throw the entire response object
        if (error.response?.data) {
          // Throw the original error instead of creating a new one
          throw error;
        }

        // For network errors or other cases where response might not exist
        throw error;
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
      console.error("Registration failed:", error);

      // Call optional error callback
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
