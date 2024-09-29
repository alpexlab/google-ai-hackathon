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

export type _BRAIN_REPORT = {
  cancer: _BRAIN_CANCER;
  report: {
    result_image: string;
    stats_image: string;
    probs: number[];
    predicted_label: string;
    max_prob: string;
    classes: string[];
    status: string;
  };
};

export type _BREAST_REPORT = {};

export type _LUNG_REPORT = {
  cancer: _BRAIN_CANCER;
  report: {
    result_image: string;
    stats_image: string;
    probs: number[];
    predicted_label: string;
    max_prob: string;
    classes: string[];
    status: string;
  };
};
