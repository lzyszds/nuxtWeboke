import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface AxiosConfig {
  baseURL?: string;
  timeout?: number;
  headers?: {
    [key: string]: string;
  };
}

// 更具体的请求方法和响应数据类型
export default async function makeRequest<T = any>({
  method,
  url,
  params,
  data,
  headers,
  timeout = 10000,
}: AxiosRequestConfig): Promise<T> {
  const defaultConfig: AxiosConfig = {
    baseURL: process.env.VITE_BASE_URL+"/api",
    timeout,
    headers: {
      'Content-Type': 'application/json',
      "x-real-ip": "180.139.210.222"
    },
  };

  const config: AxiosConfig = JSON.parse(JSON.stringify(Object.assign({}, defaultConfig, headers))) as AxiosConfig;

  // 创建 axios 实例
  const instance = axios.create(config);

  // // 添加请求拦截器
  // instance.interceptors.request.use((config) => {
  //   // 在请求发送之前做一些事情，例如添加 token
  //   config.headers!.Authorization = localStorage.getItem('lzy_token') || '';
  //   return config;
  // });

  // // 添加响应拦截器
  // instance.interceptors.response.use(
  //   (response: any) => {
  //     // 在响应返回之前做一些事情，例如处理错误
  //     if (response.status !== 200) {
  //       throw new Error(response.statusText);
  //     }
  //     return response.data;
  //   },
  //   (error) => {
  //     // 处理其他错误情况
  //     throw error;
  //   }
  // );

  try {
    // 使用 async/await 简化异步代码
    const response: AxiosResponse<T> = await instance({
      method,
      url,
      params,
      data,
      headers
    });
    if (response.data !== undefined) {
      return response.data;
    }
    return response as any as T
  } catch (error) {
    // 处理请求失败的情况
    console.error('Request failed:', error);
    throw error;
  }
}
