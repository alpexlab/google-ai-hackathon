import {
  _BRAIN_CANCER,
  _BRAIN_REPORT,
  _BREAST_CANCER,
  _BREAST_REPORT,
  _LUNG_CANCER,
  _LUNG_REPORT,
  _PATIENT,
  _SCAN,
} from '@/types';
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

export const createBrainCancer = async (formData: _BRAIN_CANCER) => {
  const options = {
    method: 'POST',
    withCredentials: true,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  };

  const response: AxiosResponse<_BRAIN_CANCER> = await basicAxios('/brain/', options);
  return response.data;
};

export const createBreastCancer = async (formData: _BREAST_CANCER) => {
  const options = {
    method: 'POST',
    withCredentials: true,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  };

  const response: AxiosResponse<_BREAST_CANCER> = await basicAxios('/breast/', options);
  return response.data;
};

export const createLungCancer = async (formData: _LUNG_CANCER) => {
  const options = {
    method: 'POST',
    withCredentials: true,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  };

  const response: AxiosResponse<_LUNG_CANCER> = await basicAxios('/lungs/', options);
  return response.data;
};

export const getScans = async (patient: string) => {
  const response: AxiosResponse<_SCAN[]> = await basicAxios(`/patients/${patient}/scans/`);
  return response.data;
};

export const getBrainReport = async (id: string) => {
  const response: AxiosResponse<_BRAIN_REPORT> = await basicAxios(`/brain/${id}/report/`);
  return response.data;
};

export const getBreastReport = async (id: string) => {
  const response: AxiosResponse<_BREAST_REPORT> = await basicAxios(`/breast/${id}/report/`);
  return response.data;
};

export const getLungReport = async (id: string) => {
  const response: AxiosResponse<_LUNG_REPORT> = await basicAxios(`/lungs/${id}/report/`);
  return response.data;
};
