<template lang="pug">
router-link(
  :to="{ name: 'Match', params: { id: item.games[0].gamePk } }",
  custom,
  v-slot="{ navigate }"
)
  #game(@click="navigate")
    p.score(v-if="item.games[0].status.statusCode == 7") {{ formatScore(item.games[0].teams) }}
    p.score(v-if="item.games[0].status.statusCode == 9") PPD
    p.date Date: {{ date }}
    p.time Time: {{ time }}
    h3.awayTeam Away Team
      .teamLogo
        img(
          :src="`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${item.games[0].teams.away.team.id}.svg`"
        )
      p(v-if="!isHeader") {{ item.games[0].teams.away.team.name }}
      p(v-if="!isHeader") {{ formatRecord(item.games[0].teams.away.leagueRecord) }}
    h3.homeTeam Home Team
      .teamLogo
        img(
          :src="`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${item.games[0].teams.home.team.id}.svg`"
        )
      p {{ item.games[0].teams.home.team.name }}
      p {{ formatRecord(item.games[0].teams.home.leagueRecord) }}
    #game-block__venue.venue
      p Venue: {{ item.games[0].venue.name }}
</template>

<script>
import { formatDate, formatTime } from '@/use/dateFormat';

export default {
  props: {
    item: {
      default: {},
    },
    isHeader: {
      default: false,
    },
  },
  setup(props) {
    // форматируем статистику команды в формат ПОБЕДЫ-ПОРАЖЕНИЯ-ПОРАЖЕНИЕвДОПвремя
    const formatRecord = (leagueRecord) => {
      const { wins, losses, ot } = leagueRecord;
      return `${wins}-${losses}-${ot}`;
    };

    // форматируем итоговый счет
    const formatScore = (teams) => {
      const { away, home } = teams;
      return `${away.score}:${home.score}`;
    };

    const date = formatDate(new Date(props.item.date));
    const time = formatTime(new Date(props.item.games[0].gameDate));

    return {
      formatScore,
      formatRecord,
      date,
      time,
    };
  },
};
</script>

<style lang="scss" scoped>
#game {
  position: relative;
  display: grid;
  grid-template-areas:
    "date away home"
    "time away home"
    "venue away home";
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 2px;
  padding: 1rem;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    cursor: pointer;
  }
}

.awayTeam,
.homeTeam {
  img {
    height: 100px;
  }
}

.date {
  grid-area: date;
}

.time {
  grid-area: time;
}

.venue {
  grid-area: venue;
}

.awayTeam {
  grid-area: away;
}

.homeTeam {
  grid-area: home;
}

.score {
  position: absolute;
  right: 10%;
  bottom: -20%;
  margin: 0;
  color: rgba(0, 0, 0, 0.12);
  font-size: 150px;
  z-index: 1;
}
</style>
