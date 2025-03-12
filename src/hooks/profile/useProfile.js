import { useUpdate } from "@hooks/useApi";

// Hook to update an existing client
export const useUpdatePersonalInfo = (options = {}) => {
  return useUpdate("/profile/personal", {
    invalidateQueries: [["clients"]],
    ...options,
  });
};

// Hook to update an existing client
export const useUpdateCompanyInfo = (options = {}) => {
  return useUpdate("/clients", {
    invalidateQueries: [["clients"]],
    ...options,
  });
};

// Hook to update an existing client
export const useChangePassword = (options = {}) => {
  return useUpdate("/clients", {
    invalidateQueries: [["clients"]],
    ...options,
  });
};
