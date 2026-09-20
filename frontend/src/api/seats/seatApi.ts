import apiClient from '../core/apiClient';

export interface Section {
  section_id: number;
  section_name: string;
  description: string;
  capacity: number;
  price_per_seat: number;
}

export interface Seat {
  seat_id: number;
  seat_label: string;
  row_number: number | null;
  column_number: number | null;
  seat_status: 'available' | 'booked' | 'deactivated';
}

export const getSections = async (): Promise<Section[]> => {
  const { data } = await apiClient.get('/seats/sections');
  return data.sections || [];
};

export const getSeatsBySection = async (sectionId: number): Promise<Seat[]> => {
  const { data } = await apiClient.get(`/seats/sections/${sectionId}/seats`);
  return data.seats || [];
};