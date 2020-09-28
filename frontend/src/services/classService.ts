import { API_CLASSES } from 'api/constants';
import authenticatedAxios from 'api/axios/authenticatedAxios';

export const getAll = () => {
  return authenticatedAxios.get(API_CLASSES);
};

export const get = (id: string) => {
  return authenticatedAxios.get(`${API_CLASSES}/${id}`);
};

export const create = (data: any) => {
  return authenticatedAxios.post(API_CLASSES, data);
};

export const update = (id: string, data: any) => {
  return authenticatedAxios.put(`${API_CLASSES}/${id}`, data);
};

export const remove = (id: string) => {
  return authenticatedAxios.delete(`${API_CLASSES}/${id}`);
};
