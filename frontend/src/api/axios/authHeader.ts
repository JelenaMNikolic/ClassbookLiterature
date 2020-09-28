import { UserInterface } from 'models/userTypes';

const authHeader = () => {
  const userFromStorage = localStorage.getItem('user');
  const user: UserInterface = userFromStorage ? JSON.parse(userFromStorage) : undefined;
  return user ? { Authorization: 'Bearer ' + user.accessToken } : undefined;
};
export default authHeader;
