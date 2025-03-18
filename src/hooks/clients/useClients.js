import { useFetch, useCreate, useUpdate, useDelete } from "@hooks/useApi";

export const useClients = ({ page, limit, search }, options = {}) => {
  const params = `page=${page}&per_page=${limit}&search=${search}`;

  return useFetch(`/clients?${params}`, ["clients", params], options);
};

export const useClient = (id, options = {}) => {
  return useFetch(`/clients/${id}`, ["client", id], {
    enabled: !!id,
    ...options,
  });
};

export const useCreateClient = (options = {}) => {
  return useCreate("/clients", {
    invalidateQueries: [["clients"]],
    ...options,
  });
};

export const useUpdateClient = (options = {}) => {
  return useUpdate("/clients", {
    invalidateQueries: [["clients"]],
    ...options,
  });
};

export const useDeleteClient = (options = {}) => {
  return useDelete(`/clients`, {
    invalidateQueries: [["clients"]],
    ...options,
  });
};
