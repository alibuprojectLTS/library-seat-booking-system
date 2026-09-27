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

export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  announcement_type?: string;
  priority?: string;
  is_pinned?: boolean;
  expires_at?: string | null;
}

export const getAllAnnouncements = async (): Promise<Announcement[]> => {
  const { data } = await apiClient.get('/admin/announcements');
  return data.announcements || [];
};

export const createAnnouncement = async (
  payload: CreateAnnouncementPayload
): Promise<Announcement> => {
  const { data } = await apiClient.post('/admin/announcements', payload);
  return data.announcement;
};

export const updateAnnouncement = async (
  id: number,
  payload: Partial<CreateAnnouncementPayload>
): Promise<Announcement> => {
  const { data } = await apiClient.put(`/admin/announcements/${id}`, payload);
  return data.announcement;
};

export const deleteAnnouncement = async (id: number): Promise<void> => {
  await apiClient.delete(`/admin/announcements/${id}`);
};