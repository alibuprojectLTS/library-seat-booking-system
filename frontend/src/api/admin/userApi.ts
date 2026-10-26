import apiClient from '../core/apiClient';

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  last_login: string | null;
}

export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await apiClient.get('/admin/users');
  return data.users || [];
};