import axios from "axios";

const game = {
  namespaced: true,
  state: {
    prevGame: {
      info: null,
      title: null,
    },
    nextGame: {
      info: null,
      title: null,
    },
    errorMsg: null,
  },
  mutations: {
    setGameInfo(state, payload) {
      const { data, status } = payload;
      if (status === "previous") {
        state.prevGame.info = data;
      }

      if (status === "next") {
        state.nextGame.info = data;
      }
    },
    setTitle(state, payload) {
      const { data, status } = payload;

      if (status === "previous") {
        state.prevGame.title = data;
      }

      if (status === "next") {
      }
    },
    setErrorMsg(state, payload) {
      state.errorMsg = payload;
    },
  },
  actions: {
    fetchInfo({ commit, rootGetters }, payload) {
      return new Promise((resolve, reject) => {
        if (payload !== "previous" && payload !== "next") {
          commit("setErrorMsg", "Wrong payload");
          reject("Wrong payload");
        }
        axios
          .get(
            `${rootGetters.URL}/api/v1/teams/16?expand=team.schedule.${payload}`
          )
          .then((response) => {
            if (payload === "previous") {
              commit("setGameInfo", {
                data:
                  response.data.teams[0].previousGameSchedule.dates[0].games[0],
                status: "previous",
              });
            }
            if (payload === "next") {
              commit("setGameInfo", {
                data: response.data.teams[0].nextGameSchedule.dates[0].games[0],
                status: "next",
              });
            }
            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    fetchRecapText({ commit, rootGetters }, payload) {
      const { link, status } = payload;
      return new Promise((resolve, reject) => {
        axios
          .get(rootGetters.URL + link)
          .then((response) => {
            console.log(response.data.editorial.recap.items[0].preview);
            commit("setTitle", {
              data: response.data.editorial.recap.items[0].headline,
              status,
            });
            resolve(true);
          })
          .catch((err) => reject(err));
      });
    },
  },
  getters: {
    info: (state) => (status) => {
      if (status === "previous") {
        return state.prevGame.info;
      }

      if (status === "next") {
        return state.nextGame.info;
      }

      if (status !== "next" && status !== "previous") {
        return false;
      }
    },
    title: (state) => (status) => {
      if (status === "previous") {
        return state.prevGame.title;
      }

      if (status === "next") {
        return state.nextGame.title;
      }

      if (status !== "next" && status !== "previous") {
        return false;
      }
    },
  },
};

export default game;
