// helpers
import api from "@helpers/axios";

// librarires
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetch = (endpoint, queryKey, options = {}) => {
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      const response = await api.get(endpoint);

      return response.data;
    },
    ...options,
  });
};

export const useCreate = (endpoint, options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess: optionsOnSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post(endpoint, data);

      return response.data;
    },
    onSuccess: (data, variables, context) => {
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: query });
        });
      }

      if (optionsOnSuccess) {
        optionsOnSuccess(data, variables, context);
      }
    },
    ...restOptions,
  });
};

export const useUpdate = (endpoint, options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess: optionsOnSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`${endpoint}/${id}`, data);

      return response.data;
    },
    onSuccess: (data, variables, context) => {
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: query });
        });
      }

      if (optionsOnSuccess) {
        optionsOnSuccess(data, variables, context);
      }
    },
    ...restOptions,
  });
};

export const useDelete = (endpoint, options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess: optionsOnSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`${endpoint}/${id}`);

      return response.data;
    },
    onSuccess: (data, variables, context) => {
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: query });
        });
      }

      if (optionsOnSuccess) {
        optionsOnSuccess(data, variables, context);
      }
    },
    ...restOptions,
  });
};
