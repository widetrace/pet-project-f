import logosUrl from '@/store/dbLogo';

const logo = {
  namespaced: true,
  state: {
    logos: logosUrl,
  },
  getters: {
    url: (state) => (payload) => {
      // Ищем в общем списке подходящую команду
      const rightTeam = state.logos.data.find((team) => {
        if (team.mostRecentTeamId === payload) {
          return true;
        }
        return false;
      });
      // Находим самый свежий логотип
      const requiredLogo = rightTeam.teams[0].logos.find((teamLogo) => {
        if (teamLogo.endSeason > 20152016) {
          return true;
        }
        return false;
      });
      // TODO: Обработчик, на случай, если нашлось несколько логотипов
      return requiredLogo.secureUrl;
    },
  },
};

export default logo;
