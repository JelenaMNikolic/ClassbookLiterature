import { API_AUTH, API_USER } from 'api/constants';
import standardAxios from 'api/axios/standardAxios';
import { UserInterface } from 'models/userTypes';
import { ResponseInterface } from 'models/apiTypes';
import authenticatedAxios from 'api/axios/authenticatedAxios';

export const register = (user: UserInterface) => {
  const { email, username, surname, password, name, position } = user;
  return standardAxios.post(API_AUTH + '/signup', {
    username,
    password,
    name,
    surname,
    email,
    position
  });
};

export const login = async (username: string, password: string): Promise<UserInterface | undefined> => {
  return await standardAxios
    .post(API_AUTH + '/signin', {
      username,
      password
    })
    .then((response: ResponseInterface) => {
      const data = response.data as UserInterface;
      console.log(data, 'data');
      if (data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      return undefined;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  console.log(user);
  return user ? JSON.parse(user) : undefined;
};

export const getCurrentUserFromDB = (id: string) => {
  return authenticatedAxios.get(`${API_USER}/${id}`);
};
