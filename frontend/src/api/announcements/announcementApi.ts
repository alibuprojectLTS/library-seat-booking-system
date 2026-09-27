import apiClient from '../core/apiClient';

export interface Announcement {
  announcement_id: number;
  admin_id: number;
  title: string;
  content: string;
  announcement_type:
    | 'general'
    | 'urgent'
    | 'holiday'
    | 'maintenance'
    | 'promotional';
  priority: 'normal' | 'high' | 'urgent';
  is_active: boolean;
  is_pinned: boolean;
  expires_at: string | null;
  created_at?: string;
  createdAt?: string;
}

export const getActiveAnnouncements = async (): Promise<Announcement[]> => {
  const { data } = await apiClient.get('/announcements');
  return data.announcements || [];
};