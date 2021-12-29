import { createStore } from 'vuex';

import gamesSchedule from './gamesSchedule';
import scoringPlays from './scoringPlays';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    schedule: gamesSchedule,
    scores: scoringPlays,
  },
});
