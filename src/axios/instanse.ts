import axios from 'axios';
import { API_KEYS, PREFIXES } from '../common/constants';

const baseURL = `${API_KEYS.BASE}/${PREFIXES.V1}/`;

export const instance = axios.create({
  baseURL,
});