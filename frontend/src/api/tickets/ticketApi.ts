import apiClient from '../core/apiClient';

export interface Ticket {
  ticket_id: number;
  ticket_code: string;
  valid_date: string;
  is_valid: boolean;
  qr_code_data?: string;
}

export const getMyTickets = async (): Promise<Ticket[]> => {
  const { data } = await apiClient.get('/tickets/my');
  return data.tickets || [];
};

export const getTicketById = async (id: number): Promise<Ticket> => {
  const { data } = await apiClient.get(`/tickets/${id}`);
  return data.ticket;
};

export const deleteTicket = async (id: number): Promise<void> => {
  await apiClient.delete(`/tickets/${id}`);
};