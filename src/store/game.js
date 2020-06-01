import axios from 'axios';

const game = {
  namespace = true,
  state: {
    prevGame: null,
    nextGame: null,
    errorMsg: null,
  },
  mutations: {
    setGameInfo(state, payload) {

    },
    setErrorMsg(state, payload) {
      state.errorMsg = payload
    }
  },
  actions: {
    getInfo({commit}, payload) {
      return new Promise((res, rej) => {
        if (payload != 'previous' || payload != "next") {
          commit('setErrorMsg', 'Wrong payload')
          rej();
        }
        
      })
    }
  },
}

export default game;