import { SUPABASE } from '@/const';

export function getAccessToken() {
  const project_id = SUPABASE.PROJECT_URL.split('https://')[1].split('.')[0];
  const key = `sb-${project_id}-auth-token`;
  const token = localStorage.getItem(key) || '';
  const access_token = (JSON.parse(token)?.access_token || '') as string;
  return access_token;
}
