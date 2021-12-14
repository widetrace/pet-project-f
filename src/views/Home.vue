<template lang="pug">
#home
  #game-block
    p Last and future games
    hr
    template(v-if="data")
      #game-block__teams(v-for="(item, index) in data.dates", :key="index")
        p.date Data: {{ item.date }}
        p.time Time: {{ format(new Date(item.games[0].gameDate), 'HH:mm') }}
        h3.awayTeam Away Team
          p Team name: {{ item.games[0].teams.away.team.name }}
          p League record: {{ formatRecord(item.games[0].teams.away.leagueRecord) }}
        h3.homeTeam Home Team
          p League record: {{ formatRecord(item.games[0].teams.home.leagueRecord) }}
          p Team name: {{ item.games[0].teams.home.team.name }}
        #game-block__score.score(v-if="item.games[0].status.statusCode == 7")
          p Score: {{ formatScore(item.games[0].teams) }}
        #game-block__venue.venue(
          :class="item.games[0].status.statusCode == 7 ? '' : 'score'"
        )
          //- p Venue: {{ item.games[0].venue }}
          p Venue: {{ item.games[0].venue.name }}
        hr
    template(v-else)
      h2 No games
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

import { reactive, toRefs } from 'vue';
import { subDays, add, format } from 'date-fns';
import axios from 'axios';

export default {
  setup() {
    const state = reactive({
      count: 0,
      data: null,
    });

    // форматируем статистику команды в формат ПОБЕДЫ-ПОРАЖЕНИЯ-ПОРАЖЕНИЕвДОПвремя
    const formatRecord = (leagueRecord) => {
      const { wins, losses, ot } = leagueRecord;
      return `${wins}-${losses}-${ot}`;
    };

    const formatScore = (teams) => {
      const { away, home } = teams;
      return `${away.score}:${home.score}`;
    };

    const date = new Date();

    const twoWeeksAgo = subDays(date, 7);
    const twoWeeksAgoFormat = format(twoWeeksAgo, 'yyyy-MM-dd');

    const twoWeeksAhead = add(date, { weeks: 1 });
    const twoWeeksAheadFormat = format(twoWeeksAhead, 'yyyy-MM-dd');

    axios
      .get(
        `https://statsapi.web.nhl.com/api/v1/schedule?teamId=16&startDate=${twoWeeksAgoFormat}&endDate=${twoWeeksAheadFormat}`,
      )
      .then((res) => {
        state.data = res.data;
      })
      .catch((err) => console.log(err));

    return {
      ...toRefs(state),
      format,
      formatRecord,
      formatScore,
    };
  },
};
</script>

<style lang="scss" scoped>
#game-block {
  &__teams {
    display: grid;
    grid-template-areas:
      "date away home"
      "time away home"
      "venue score score"
      "hr hr hr";

    hr {
      grid-area: hr;
      width: 100%;
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

  .score {
    grid-area: score;
  }

  .awayTeam {
    grid-area: away;
  }

  .homeTeam {
    grid-area: home;
  }
}
</style>
