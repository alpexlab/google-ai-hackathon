export type _AUTH_CONTEXT = {
  email: string | undefined;
  last_sign_in?: string | undefined;
};

export type _PATIENT = {
  id?: string;
  name: string;
  age: number;
  email: string;
  medical_history: string;
  photo: string | File | null;
  summary?: string;
  created_at: string;
};

export type _GENOME_REPORT = {
  cancer: _GENOME;
  report: {
    output: string;
    status: string;
  };
};

export type _SURVIVAL = {
  tstage: string;
  nstage: string;
  mstage: string;
  type: string;
};

export type _DOCUMENT = {
  comments: string;
  document: File | null | string;
  id?: string;
  created_at?: string;
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
  comments: string;
  id?: string;
};

export type _SKIN_CANCER = {
  patient: string;
  mri: File | null | string;
  comments: string;
  id?: string;
};

export type _GENOME = {
  patient: string;
  vcf: File | null | string;
  id?: string;
};

export type _BREAST_CANCER = {
  patient: string;
  mri: File | null | string;
  id?: string;
  comments: string;
};

export type _LUNG_CANCER = {
  patient: string;
  mri: File | null | string;
  id?: string;
  comments: string;
};

export type _BRAIN_REPORT = {
  cancer: _BRAIN_CANCER;
  report: {
    result_image: string;
    stats_image: string;
    segmented_image: string;
    probs: number[];
    predicted_label: string;
    max_prob: string;
    classes: string[];
    status: string;
  };
};

export type _SKIN_REPORT = {
  cancer: _SKIN_CANCER;
  report: {
    result_image: string;
    segmented_image: string;
    probs: number[];
    predicted_label: string;
    max_prob: string;
    classes: string[];
    status: string;
  };
};

export type _BREAST_REPORT = {
  cancer: _BREAST_CANCER;
  report: {
    result_image: string;
    segmented_image: string;
    stats_image: string;
    probs: number[];
    predicted_label: string;
    max_prob: string;
    classes: string[];
    status: string;
  };
};

export type _LUNG_REPORT = {
  cancer: _LUNG_CANCER;
  report: {
    result_image: string;
    stats_image: string;
    segmented_image: string;
    probs: number[];
    predicted_label: string;
    max_prob: string;
    classes: string[];
    status: string;
  };
};

export type _CASE_STUDY = {
  id?: string;
  title: string;
  description: string;
  author?: string;
};

export type _MEDICAL_HISTORY = {
  chart: {
    title: string;
    labels: string[];
    points: {
      [key: string]: string | number;
    }[];
  }[];
  segments: {
    [key: string]: {
      img: string;
      timestamp: string;
    }[];
  };
};
