import authenticatedAxios from 'api/axios/authenticatedAxios';
import { API_DIGITAL_LITERATURE } from 'api/constants';

export const getAll = () => {
  return authenticatedAxios.get(API_DIGITAL_LITERATURE);
};

export const get = (id: string) => {
  return authenticatedAxios.get(`${API_DIGITAL_LITERATURE}/${id}`);
};

export const create = (data: any) => {
  return authenticatedAxios.post(API_DIGITAL_LITERATURE, data);
};

export const update = (id: string, data: any) => {
  return authenticatedAxios.put(`${API_DIGITAL_LITERATURE}/${id}`, data);
};

export const remove = (id: string) => {
  return authenticatedAxios.delete(`${API_DIGITAL_LITERATURE}/${id}`);
};
