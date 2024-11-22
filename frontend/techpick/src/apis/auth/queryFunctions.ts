import { apiClient } from '@/apis/apiClient';

export const postLogout = async () => {
  return await apiClient.post('logout').json();
};
