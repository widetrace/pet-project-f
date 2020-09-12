import Vue from 'vue';
import Vuex from 'vuex';
import game from './game';
import logo from './logo';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    URL: 'https://statsapi.web.nhl.com',
    selectedTeam: 16,
  },
  mutations: {},
  actions: {},
  getters: {
    URL(state) {
      return state.URL;
    },
  },
  modules: {
    game, logo,
  },
});
