import apiClient from '../core/apiClient';

export interface Section {
  section_id: number;
  section_name: string;
  price_per_seat: number;
}

export const getAllSections = async (): Promise<Section[]> => {
  const { data } = await apiClient.get('/admin/sections');
  return data.sections || [];
};

export const updateSectionPrice = async (id: number, price: number): Promise<Section> => {
  const { data } = await apiClient.put(`/admin/sections/${id}/price`, { price_per_seat: price });
  return data.section;
};