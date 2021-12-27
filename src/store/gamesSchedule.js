import fetchSchedule from '@/api/fetchMain';

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
    async fetchGames({ commit }, { startDate, endDate }) {
      try {
        const data = await fetchSchedule(startDate, endDate);
        commit('setSchedule', data);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  getters: {
    games(state) {
      return state.scheduledGames;
    },
  },
};
