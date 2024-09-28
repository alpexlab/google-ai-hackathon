import { _PATIENT } from '@/types';
import { basicAxios } from './basicAxios';
import type { AxiosResponse } from 'axios';

import { SUPABASE } from '@/const';

export function getAccessToken() {
  const project_id = SUPABASE.PROJECT_URL.split('https://')[1].split('.')[0];
  const key = `sb-${project_id}-auth-token`;
  const token = localStorage.getItem(key) || '';
  const access_token = (JSON.parse(token)?.access_token || '') as string;
  return access_token;
}

export const addPatient = async (formData: _PATIENT) => {
  const options = {
    method: 'POST',
    withCredentials: true,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  };

  const response: AxiosResponse<_PATIENT> = await basicAxios('/patients/', options);
  return response.data;
};

export const getPatients = async () => {
  const response: AxiosResponse<_PATIENT[]> = await basicAxios('/patients/');
  return response.data;
};

export const getPatient = async (id: string) => {
  const response: AxiosResponse<_PATIENT> = await basicAxios(`/patients/${id}/`);
  return response.data;
};
