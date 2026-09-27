import apiClient from '../core/apiClient';

export interface LibraryStatus {
  status_id?: number;
  current_state: 'open' | 'full' | 'closed' | 'maintenance';
  capacity_used: number;
  capacity_total: number;
  message: string;
  open_hours: string;
  updated_by?: number;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

export interface UpdateStatusPayload {
  current_state: string;
  capacity_used: number;
  capacity_total: number;
  message: string;
  open_hours: string;
}

// ============ PUBLIC ============

export const getStatus = async (): Promise<LibraryStatus> => {
  const { data } = await apiClient.get('/status');
  return data.status;
};

// ============ ADMIN ============

export const updateStatus = async (
  payload: UpdateStatusPayload
): Promise<LibraryStatus> => {
  const { data } = await apiClient.put('/admin/status', payload);
  return data.status;
};