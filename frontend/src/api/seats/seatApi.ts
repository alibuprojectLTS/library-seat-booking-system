import apiClient from '../core/apiClient';

export interface Section {
  section_id: number;
  section_name: string;
  description: string;
  capacity: number;
  price_per_seat: number;
  actual_seats?: number; 
}

export interface Seat {
  seat_id: number;
  seat_label: string;
  row_number: number | null;
  column_number: number | null;
  seat_status: 'available' | 'booked' | 'deactivated';
}

// ============ READ (existing — unchanged) ============

export const getSections = async (): Promise<Section[]> => {
  const { data } = await apiClient.get('/seats/sections');
  return data.sections || [];
};

export const getSeatsBySection = async (sectionId: number): Promise<Seat[]> => {
  const { data } = await apiClient.get(`/seats/sections/${sectionId}/seats`);
  return data.seats || [];
};

// ============ ADMIN (new — added) ============

export interface CreateSeatPayload {
  section_id: number;
  seat_label: string;
  row_number?: number | null;
  column_number?: number | null;
  seat_status?: 'available' | 'booked' | 'deactivated';
}

export interface CSVUploadSummary {
  total_rows: number;
  added: number;
  skipped: number;
  validation_errors: string[];
  skip_reasons: string[];
}

export const addSeat = async (payload: CreateSeatPayload): Promise<Seat> => {
  const { data } = await apiClient.post('/admin/seats', payload);
  return data.seat;
};

export const updateSeat = async (
  seatId: number,
  payload: Partial<CreateSeatPayload>
): Promise<Seat> => {
  const { data } = await apiClient.put(`/admin/seats/${seatId}`, payload);
  return data.seat;
};

export const deleteSeat = async (seatId: number): Promise<void> => {
  await apiClient.delete(`/admin/seats/${seatId}`);
};

export const uploadSeatsCSV = async (
  sectionId: number,
  file: File
): Promise<CSVUploadSummary> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('section_id', String(sectionId));

  const { data } = await apiClient.post('/admin/seats/csv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data.summary;
};