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
