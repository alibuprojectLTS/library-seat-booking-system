import apiClient from '../core/apiClient';

export interface Announcement {
  announcement_id: number;
  title: string;
  content: string;
  announcement_type: string;
  priority: string;
  is_pinned: boolean;
  created_at: string;
}

export const getActiveAnnouncements = async (): Promise<Announcement[]> => {
  const { data } = await apiClient.get('/announcements');
  return data.announcements || [];
};