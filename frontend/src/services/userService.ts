import { API_ROOT, API_USER } from 'api/constants';
import standardAxios from 'api/axios/standardAxios';
import authenticatedAxios from 'api/axios/authenticatedAxios';

export const getPublicContent = () => {
  return standardAxios.get(`${API_ROOT}/all`);
};

export const getUserBoard = () => {
  return authenticatedAxios.get(`${API_ROOT}/user`);
};

export const getAdminBoard = () => {
  return authenticatedAxios.get(`${API_ROOT}/admin`);
};

export const update = (id: string, data: any) => {
  return authenticatedAxios.put(`${API_USER}/${id}`, data);
};
