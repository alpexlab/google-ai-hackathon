import { BACKEND_URL } from '@/const';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

export const readCSRFToken = () => {
  const csrfToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken'))
    ?.split('=')[1];
  return csrfToken;
};

export const basicAxios = async (endpoint: string, options?: AxiosRequestConfig) => {
  const res = await axios({
    baseURL: BACKEND_URL,
    url: endpoint,
    method: 'GET',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': readCSRFToken(),
    },
    ...options,
  });
  return res;
};
