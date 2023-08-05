import axios from 'axios';
import { API_KEYS } from '../common/constants';

const baseURL = API_KEYS.BASE || 'http://localhost:8080/api';

export const instance = axios.create({
  baseURL,
  // headers: {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  // },
});