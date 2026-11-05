import { AxiosRequestConfig, AxiosResponse } from 'axios';

import http from '@utils/axios/http';

export class BaseService {
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await http.get<T>(url, config);
    return response.data;
  }

  protected async post<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response = await http.post<TRequest, AxiosResponse<TResponse>>(url, data, config);
    return response.data;
  }

  protected async put<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response = await http.put<TRequest, AxiosResponse<TResponse>>(url, data, config);
    return response.data;
  }

  protected async patch<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response = await http.patch<TRequest, AxiosResponse<TResponse>>(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await http.delete<T>(url, config);
    return response.data;
  }
}
