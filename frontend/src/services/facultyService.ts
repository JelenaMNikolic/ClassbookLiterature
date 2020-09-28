import { API_FACULTIES } from 'api/constants';
import authenticatedAxios from 'api/axios/authenticatedAxios';

export const getAll = () => {
  return authenticatedAxios.get(API_FACULTIES);
};

export const get = (id: string) => {
  return authenticatedAxios.get(`${API_FACULTIES}/${id}`);
};

export const create = (data: any) => {
  return authenticatedAxios.post(API_FACULTIES, data);
};

export const update = (id: string, data: any) => {
  return authenticatedAxios.put(`${API_FACULTIES}/${id}`, data);
};

export const remove = (id: string) => {
  return authenticatedAxios.delete(`${API_FACULTIES}/${id}`);
};
