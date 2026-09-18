export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const TOKEN_KEY = 'library_token';
export const USER_KEY = 'library_user';