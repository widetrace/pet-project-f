import { fetchGames } from '@/api/fetchMain';

export default {
  namespaced: true,
  state: {
    scheduledGames: null,
  },
  mutations: {
    setSchedule(state, games) {
      state.scheduledGames = games;
    },
  },
  actions: {
    async fetchSchedule({ commit }, { startDate, endDate }) {
      try {
        const data = await fetchGames(startDate, endDate);
        commit('setSchedule', data);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  getters: {
    games(state) {
      if (state.scheduledGames) {
        return state.scheduledGames;
      }
      return false;
    },
  },
};
