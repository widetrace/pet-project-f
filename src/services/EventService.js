//  import axios
import axios from 'axios';
// import NProgress from 'nprogress';

const apiClient = axios.create({
  baseURL: 'https://statsapi.web.nhl.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => config);

apiClient.interceptors.response.use((response) => response);

export default {
  getGameInfo(id, status) {
    return apiClient.get(`/api/v1/teams/${id}?expand=team.schedule.${status}`);
  },
  getRecapText(link) {
    return apiClient.get(link);
  },
};
