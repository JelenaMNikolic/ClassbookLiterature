import axios from 'axios';

import authHeader from 'api/axios/authHeader';
import { API_ROOT } from 'api/constants';

const authenticatedAxios = axios.create({
  baseURL: API_ROOT,
  headers: authHeader()
});

export default authenticatedAxios;
