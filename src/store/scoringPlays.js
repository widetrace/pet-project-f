import { fetchGameDetails } from '@/api/fetchMain';

const state = () => ({
  gameData: null,
  liveData: null,
});

const getters = {
  // eslint-disable-next-line no-shadow
  playsByPeriods({ liveData }) {
    // получаем все голевые моменты
    const { plays } = liveData;
    const goals = [];
    const goalsByPeriods = {
      first: [],
      second: [],
      third: [],
      ot: [],
      other: [],
    };

    plays.scoringPlays.forEach((play) => {
      const exactPlay = plays.allPlays[play];
      const goalData = {
        stat: `${exactPlay.about.goals.home}:${exactPlay.about.goals.away}`,
        scorer: exactPlay.players[0].player.fullName,
        scorerGoalsTotal: exactPlay.players[0].seasonTotal,
        assistants: exactPlay.result.description.split('assists: ')[1] || '',
        teamId: exactPlay.team.id,
        shotType: exactPlay.result.secondaryType,
        strength: exactPlay.result.strength.name,
        about: exactPlay.about,
      };
      goals.push(goalData);
    });

    // фильтруем голы по периодам

    goals.forEach((play) => {
      switch (play.about.period) {
        case 1:
          goalsByPeriods.first.push(play);
          break;
        case 2:
          goalsByPeriods.second.push(play);
          break;
        case 3:
          goalsByPeriods.third.push(play);
          break;
        case 4:
          goalsByPeriods.ot.push(play);
          break;
        default:
          goalsByPeriods.other.push(play);
          break;
      }
    });

    return goalsByPeriods;
  },

  stars({ liveData }) {
    const { firstStar, secondStar, thirdStar } = liveData.value.decisions;
    return { firstStar, secondStar, thirdStar };
  },

  homeTeam({ gameData }) {
    return gameData.value.teams.home;
  },

  awayTeam({ gameData }) {
    return gameData.value.teams.away;
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  setDetails(state, data) {
    const { gameData, liveData } = data;

    state.gameData = gameData;
    state.liveData = liveData;
  },
};

const actions = {
  async fetchDetails({ commit }, gameId) {
    try {
      const data = await fetchGameDetails(gameId);
      commit('setDetails', data);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default {
  namespaced: true, state, getters, mutations, actions,
};
