import axios from 'axios';
import configuration from '../../ApplicationSettings';

const apiClient = axios.create({
  baseURL: configuration.BACKEND_URL,
});

export const get = async (url, successFunc) => {
  try {
    const resp = await apiClient.get(url);
    return successFunc(resp.data);
  } catch (e) {
    return false;
  }
};
