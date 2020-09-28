import { API_AUTHORS } from 'api/constants';
import authenticatedAxios from 'api/axios/authenticatedAxios';

export const getAll = () => {
  return authenticatedAxios.get(API_AUTHORS);
};

export const get = (id: string) => {
  return authenticatedAxios.get(`${API_AUTHORS}/${id}`);
};

export const create = (data: any) => {
  return authenticatedAxios.post(API_AUTHORS, data);
};

export const update = (id: string, data: any) => {
  return authenticatedAxios.put(`${API_AUTHORS}/${id}`, data);
};

export const remove = (id: string) => {
  return authenticatedAxios.delete(`${API_AUTHORS}/${id}`);
};
