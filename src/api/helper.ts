import axios from 'axios';
import qs from 'qs';

import { router } from '@/router';
import { useAuthStore } from '@/stores/auth';
import { Route } from '@/enums/route';

import { OverriddenAxiosError, OverriddenAxiosInstance } from '@/typings/axios';

(window as any).qs = qs;

export function axiosInstanceWithInterceptors<T = any>(
  baseURL: string,
  getUserFriendlyErrorMessage: (error: OverriddenAxiosError<T>) => string
): OverriddenAxiosInstance {
  const axiosInstance = axios.create({
    baseURL,
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, { skipNulls: true, allowDots: true }),
    },
  }) as OverriddenAxiosInstance;

  axiosInstance.interceptors.request.use((config) => {
    // Defaults to true, so if it's undefined, we'll include the token
    if (typeof config.authenticate === 'undefined' || config.authenticate) {
      const authStore = useAuthStore();
      if (authStore.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: OverriddenAxiosError<T>) => {
      error.userFriendlyMessage = getUserFriendlyErrorMessage(error);

      // redirectOn401 should default to true, so if it's undefined, we'll redirect
      if (
        error.response?.status === 401 &&
        (typeof error.config?.redirectOn401 === 'undefined' ||
          error.config?.redirectOn401)
      ) {
        useAuthStore().logout();
        router.push(
          Route.Login.toLocation({ goto: router.currentRoute.value.fullPath })
        );
      }

      throw error;
    }
  );

  return axiosInstance;
}
