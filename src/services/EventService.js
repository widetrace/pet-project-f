//  import axios
import axios from 'axios';
import NProgress from 'nprogress';

const apiClient = axios.create({
  baseURL: 'https://statsapi.web.nhl.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

apiClient.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

export default {
  getGameInfo(id, status) {
    return apiClient.get(`/api/v1/teams/${id}?expand=team.schedule.${status}`);
  },
  getRecapText(link) {
    return apiClient.get(link);
  },
};
