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
  actions: {},
  getters: {},
};
