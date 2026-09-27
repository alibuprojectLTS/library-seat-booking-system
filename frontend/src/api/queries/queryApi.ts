import apiClient from '../core/apiClient';

export interface QueryReply {
  reply_id: number;
  query_id: number;
  message: string;
  is_internal?: boolean;
  created_at?: string;
  createdAt?: string;
  User?: {
    first_name: string;
    last_name: string;
    role: string;
  };
}

export interface Query {
  query_id: number;
  user_id: number;
  subject: string;
  message: string;
  category: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  QueryReplies?: QueryReply[];
}

export interface CreateQueryPayload {
  subject: string;
  message: string;
  category?: string;
  priority?: string;
}

export const submitQuery = async (payload: CreateQueryPayload): Promise<Query> => {
  const { data } = await apiClient.post('/queries', payload);
  return data.query;
};

export const getMyQueries = async (): Promise<Query[]> => {
  const { data } = await apiClient.get('/queries/my');
  return data.queries || [];
};

export const deleteQuery = async (id: number): Promise<void> => {
  await apiClient.delete(`/queries/${id}`);
};