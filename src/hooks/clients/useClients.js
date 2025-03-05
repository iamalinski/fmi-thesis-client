import { useFetch, useCreate, useUpdate, useDelete } from "./useApi";

// Hook to fetch all clients
export const useClients = (options = {}) => {
  return useFetch("/clients", "clients", options);
};

// Hook to fetch a single client by ID
export const useClient = (id, options = {}) => {
  return useFetch(`/clients/${id}`, ["client", id], {
    enabled: !!id,
    ...options,
  });
};

// Hook to create a new client
export const useCreateClient = (options = {}) => {
  return useCreate("/clients", {
    invalidateQueries: [["clients"]],
    ...options,
  });
};

// Hook to update an existing client
export const useUpdateClient = (options = {}) => {
  return useUpdate("/clients", {
    invalidateQueries: [["clients"]],
    ...options,
  });
};

// Hook to delete a client
export const useDeleteClient = (options = {}) => {
  return useDelete("/clients", {
    invalidateQueries: [["clients"]],
    ...options,
  });
};
