import type { ApiError } from '@lib/api/types';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

const authPaths = ['/login', '/auth-callback'];

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: '/api',
      headers,
      timeout: 10000,
      withCredentials: true,
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  async post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleError(error: AxiosError): Promise<never> {
    const statusCode = error.response?.status ?? 0;
    const data = error.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined;

    const apiError: ApiError = {
      message: data?.message ?? error.message ?? 'Request failed',
      statusCode,
      errors: data?.errors,
    };

    switch (statusCode) {
      case StatusCode.Unauthorized: {
        const onAuthPage = authPaths.some((p) => window.location.pathname.startsWith(p));
        if (!onAuthPage) {
          window.location.href = '/login';
        }
        break;
      }
      case StatusCode.Forbidden: {
        window.location.href = '/forbidden';
        break;
      }
      default: {
        break;
      }
    }

    return Promise.reject(apiError);
  }
}

const http = new Http();
export default http;
