import Vue from 'vue';
import Vuex from 'vuex';
import notification from '@/store/modules/notification';
import game from './game';
import logo from './logo';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedTeam: 16,
  },
  mutations: {},
  actions: {},
  modules: {
    game,
    logo,
    notification,
  },
});
