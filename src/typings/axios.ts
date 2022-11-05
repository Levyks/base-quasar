/**
 * We will override some of axios's typings in order to include a 'redirectOn401' and a 'authenticate' property
 */

import {
  Axios,
  AxiosError,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export type OverriddenAxiosRequestConfig<D = any> = {
  redirectOn401?: boolean;
  authenticate?: boolean;
} & AxiosRequestConfig<D>;

export type OverriddenAxios = {
  interceptors: {
    request: AxiosInterceptorManager<OverriddenAxiosRequestConfig>;
  } & Axios['interceptors'];
  getUri(config?: OverriddenAxiosRequestConfig): string;
  request<T = any, D = any>(
    config: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  get<T = any, D = any>(
    url: string,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  delete<T = any, D = any>(
    url: string,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  head<T = any, D = any>(
    url: string,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  options<T = any, D = any>(
    url: string,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  postForm<T = any, D = any>(
    url: string,
    data?: D,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  putForm<T = any, D = any>(
    url: string,
    data?: D,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
  patchForm<T = any, D = any>(
    url: string,
    data?: D,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;
} & Axios;

export type OverriddenAxiosInstance = {
  <T = any, D = any>(config: OverriddenAxiosRequestConfig<D>): Promise<
    AxiosResponse<T>
  >;
  <T = any, D = any>(
    url: string,
    config?: OverriddenAxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>>;

  defaults: AxiosInstance['defaults'];
} & OverriddenAxios;

export type OverriddenAxiosError<T = unknown, D = any> = {
  config?: OverriddenAxiosRequestConfig<D>;
  userFriendlyMessage?: string;
} & AxiosError<T, D>;
