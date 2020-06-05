import axios from "axios";

const game = {
  namespaced: true,
  state: {
    prevGame: null,
    nextGame: null,
    errorMsg: null,
  },
  mutations: {
    setGameInfo(state, payload) {
      const { data, status } = payload;
      console.log(status);
    },
    setErrorMsg(state, payload) {
      state.errorMsg = payload;
    },
  },
  actions: {
    fetchInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        if (payload !== "previous" && payload !== "next") {
          commit("setErrorMsg", "Wrong payload");
          reject("Wrong payload");
        }
        axios
          .get(
            `https://statsapi.web.nhl.com/api/v1/teams/16?expand=team.schedule.${payload}`
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
          .catch((err) => reject(err));
      });
    },
  },
  getters: {

  },
};

export default game;
