import EventServivce from '@/services/EventService';

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
  },
  mutations: {
    SET_TITLE(state, payload) {
      const { data, status } = payload;

      if (status === 'previous') {
        state.prevGame.title = data;
      }

      // Check titles for next game on API
      // if (status === 'next') {
      // }
    },
    SET_ERROR_MSG(state, payload) {
      state.errorMsg = payload;
    },
    SET_GAME_INFO(state, { data, status }) {
      switch (status) {
        case 'previous': {
          state.prevGame.info = data;
          break;
        }
        case 'next': {
          state.nextGame.info = data;
          break;
        }
        default: {
          // eslint-disable-next-line no-console
          console.error('Something goes wrong');
        }
      }
    },
  },
  actions: {
    getInfo({ commit, dispatch, rootState }, payload) {
      if (payload !== 'previous' && payload !== 'next') {
        commit('SET_ERROR_MSG', 'Wrong payload');
        return false;
      }
      return EventServivce.getGameInfo(rootState.selectedTeam, payload)
        .then((res) => {
          const data = res.data.teams[0];
          if (!(data.previousGameSchedule || data.nextGameSchedule)) {
            return false;
          }

          commit('SET_GAME_INFO', {
            data:
                payload === 'previous'
                  ? data.previousGameSchedule.dates[0].games[0]
                  : data.nextGameSchedule.dates[0].games[0],
            status: payload,
          });

          if (payload === 'previous') {
            dispatch('fetchRecapText', {
              link: data.previousGameSchedule.dates[0].games[0].content.link,
              status: 'previous',
            });
          }

          return true;
        })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching game info ${err.message}`,
          };
          dispatch('notification/add', notification, { root: true });
        });
    },
    fetchRecapText({ commit }, payload) {
      const { link, status } = payload;

      return EventServivce.getRecapText(link)
        .then((res) => {
          commit('SET_TITLE', {
            data: res.data.editorial.recap.items[0].headline,
            status,
          });
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    },
  },
  getters: {
    info: (state) => (status) => {
      if (status === 'previous') {
        return state.prevGame.info;
      }

      if (status === 'next') {
        return state.nextGame.info;
      }

      return false;
    },
    title: (state) => (status) => {
      if (status === 'previous') {
        return state.prevGame.title;
      }

      if (status === 'next') {
        return state.nextGame.title;
      }

      return false;
    },
  },
};

export default game;
