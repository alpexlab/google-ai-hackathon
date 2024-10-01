import {
  _BRAIN_CANCER,
  _BRAIN_REPORT,
  _BREAST_CANCER,
  _BREAST_REPORT,
  _LUNG_CANCER,
  _LUNG_REPORT,
  _PATIENT,
  _SCAN,
  _SURVIVAL,
} from '@/types';
import { basicAxios } from './basicAxios';
import type { AxiosResponse } from 'axios';
import { getAccessToken } from './utils';

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

export const getChatResponse = async (message: string) => {
  const options = {
    method: 'POST',
    withCredentials: true,
    data: { message },
  };

  const response: AxiosResponse<string> = await basicAxios('/chat/', options);
  return response.data;
};

export const getSurvivalResponse = async (form: _SURVIVAL, patientId: string) => {
  const options = {
    method: 'POST',
    withCredentials: true,
    data: form,
  };

  const response: AxiosResponse<string> = await basicAxios(
    `/patients/${patientId}/survival/`,
    options
  );
  return response.data;
};

export const getNotificationCount = async () => {
  const response: AxiosResponse<number> = await basicAxios('/notifications/count/');
  return response.data;
};

export const getNotifications = async () => {
  const response: AxiosResponse<
    {
      id: string;
      message: string;
    }[]
  > = await basicAxios('/notifications/');
  return response.data;
};

export const deleteNotification = async (id: string) => {
  const options = {
    method: 'DELETE',
    withCredentials: true,
  };

  await basicAxios(`/notifications/${id}/`, options);
};
