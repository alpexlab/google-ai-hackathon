export type _AUTH_CONTEXT = {
  email: string | undefined;
};

export type _PATIENT = {
  id?: string;
  name: string;
  age: number;
  email: string;
  medical_history: string;
  photo: string | File | null;
};

export type _SCAN = {
  id: string;
  type: string;
  status: string;
  timestamp: string;
};

export type _BRAIN_CANCER = {
  patient: string;
  mri: File | null | string;
  id?: string;
};

export type _BREAST_CANCER = {
  patient: string;
  mri: File | null | string;
  id?: string;
};

export type _LUNG_CANCER = {
  patient: string;
  mri: File | null | string;
  id?: string;
};
