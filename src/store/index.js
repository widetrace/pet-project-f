import Vue from "vue";
import Vuex from "vuex";
import game from "./game";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    URL: "https://statsapi.web.nhl.com",
  },
  mutations: {},
  actions: {},
  getters: {
    URL(state) {
      return state.URL;
    },
  },
  modules: {
    game,
  },
});
