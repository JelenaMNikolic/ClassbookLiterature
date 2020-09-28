import axios from 'axios';
import { API_ROOT } from 'api/constants';

const standardAxios = axios.create({
  baseURL: API_ROOT
});

export default standardAxios;
