

export default function useApiFetch<T>(url: string, options: any = {}) {
  const config = useRuntimeConfig(); // 获取 nuxt 的运行时配置
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    "x-real-ip": "180.139.210.222"
  };

  return $fetch<T>(url, {
    baseURL: useRuntimeConfig().public.VITE_BASE_URL + '/api', // 全局 baseURL
    ...options, // 合并传入的配置
    headers, // 覆盖或添加 headers
    onRequest({ options }) {
      // 可以在此进行请求前拦截，如添加 token
      // const token = useCookie('token'); // 假设使用 Cookie 中的 token
      // if (token) {
      //   options.headers.Authorization = `Bearer ${token}`;
      // }
    },
    onResponse({ response }) {
      // 可以在此进行响应后的全局处理
      console.log('Response received:', response);
    },
    onResponseError({ response }) {
      // 全局错误处理
      console.error('Error response:', response);
      throw new Error(response?._data?.message || 'Request failed');
    },
  });
}
