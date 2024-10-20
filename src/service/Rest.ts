import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {RestServiceInterFace} from './type';
import {geoCodingIntance} from './axios';

class Rest implements RestServiceInterFace {
  constructor(private axiosInstance: AxiosInstance = geoCodingIntance) {}

  async get<T>(
    url: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response;
  }

  post<T, D>(url: string, data: D): Promise<T> {
    return this.axiosInstance.post(url, data);
  }

  put<T, D>(url: string, data: D): Promise<T> {
    return this.axiosInstance.put(url, data);
  }

  delete<T>(url: string): Promise<T> {
    return this.axiosInstance.delete(url);
  }
}

export default Rest;
