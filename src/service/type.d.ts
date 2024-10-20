import {QueryKey} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse} from 'axios';

interface QueryParam {
  queryKey: string[];
  signal: AbortSignal;
  meta: QueryMeta | undefined;
  pageParam?: unknown;
  direction?: unknown;
}

/**
 * Interface representing a RESTful service with common HTTP methods.
 */
interface RestServiceInterFace {
  /**
   * Sends a GET request to the specified URL.
   * @template T The type of the response data.
   * @param url The URL to send the GET request to.
   * @returns A promise that resolves to the response data.
   */
  get<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Sends a POST request to the specified URL with the provided data.
   * @template T The type of the response data.
   * @template D The type of the request data.
   * @param url The URL to send the POST request to.
   * @param data The data to include in the POST request.
   * @returns A promise that resolves to the response data.
   */
  post<T, D>(url: string, data: D): Promise<AxiosResponse<T>>;

  /**
   * Sends a PUT request to the specified URL with the provided data.
   * @template T The type of the response data.
   * @template D The type of the request data.
   * @param url The URL to send the PUT request to.
   * @param data The data to include in the PUT request.
   * @returns A promise that resolves to the response data.
   */
  put<T, D>(url: string, data: D): Promise<AxiosResponse<T>>;

  /**
   * Sends a DELETE request to the specified URL.
   * @template T The type of the response data.
   * @param url The URL to send the DELETE request to.
   * @returns A promise that resolves to the response data.
   */
  delete<T>(url: string): Promise<AxiosResponse<T>>;
}
