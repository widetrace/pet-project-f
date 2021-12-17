<template lang='pug'>
div
  h1 Match page {{ id }}
  template(v-if="isReady")
    h3 Three stars of the match
    div(v-for="(item, index) in stars", :key="item.id")
      | {{ starString(index) }}{{ item.fullName }}
    div
      h2 First period
      p {{ returnPeriodScore(1) }}
    div
      h2 Second period
      p {{ returnPeriodScore(2) }}
    div
      h2 Third period
      p {{ returnPeriodScore(3) }}
    div
      h2 Overtime
      p {{ returnPeriodScore(4) }}
    //- div(v-for="(score, index) in scores", :key="index")
    //-   p {{ score }}
    //-   p {{ score.stat }} | {{ score.scorer }} ({{ score.scorerGoalsTotal }})
    .homeTeam
      img(
        :src="`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${homeTeam.id}.svg`"
      )
    .awayTeam
      img(
        :src="`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${awayTeam.id}.svg`"
      )
  template(v-else)
    p Loading
</template>

<script>
/* eslint-disable max-len */
import axios from 'axios';
import { computed, nextTick, ref } from 'vue';

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const gameData = ref(null);
    const liveData = ref(null);
    const isReady = ref(false);
    const scorePlays = [];

    const homeTeam = computed(() => {
      if (gameData.value) {
        return gameData.value.teams.home;
      }
      return 'no data';
    });

    const awayTeam = computed(() => {
      if (gameData.value) {
        return gameData.value.teams.away;
      }
      return 'no data';
    });

    const stars = computed(() => {
      const { firstStar, secondStar, thirdStar } = liveData.value.decisions;
      return { firstStar, secondStar, thirdStar };
    });

    const filterPlays = () => {
      const { plays } = liveData.value;

      plays.scoringPlays.forEach((play) => {
        const exactPlay = plays.allPlays[play];
        const goalData = {
          stat: `${exactPlay.about.goals.home}:${exactPlay.about.goals.away}`,
          scorer: exactPlay.players[0].player.fullName,
          scorerGoalsTotal: exactPlay.players[0].seasonTotal,
          assistants: exactPlay.result.description.split('assists: ')[1] || '',
          teamId: exactPlay.team.id,
          about: exactPlay.about,
        };
        scorePlays.push(goalData);
      });
    };

    const returnPeriodScore = (num) => {
      switch (num) {
        case 1:
          return scorePlays.filter((score) => score.about.period === 1);
        case 2:
          return scorePlays.filter((score) => score.about.period === 2);
        case 3:
          return scorePlays.filter((score) => score.about.period === 3);
        case 4:
          return scorePlays.filter((score) => score.about.period === 4);
        default:
          return '';
      }
    };

    const starString = (place) => {
      switch (place) {
        case 'firstStar':
          return '⭐';
        case 'secondStar':
          return '⭐⭐';
        case 'thirdStar':
          return '⭐⭐⭐';
        default:
          return '';
      }
    };

    nextTick(async () => {
      const { data } = await axios.get(
        `https://statsapi.web.nhl.com/api/v1/game/${props.id}/feed/live`,
      );
      gameData.value = data.gameData;
      liveData.value = data.liveData;
      filterPlays();
      isReady.value = true;
    });

    return {
      isReady,
      homeTeam,
      awayTeam,
      stars,
      returnPeriodScore,
      starString,
    };
  },
};
</script>

<style lang="scss" scoped>
.homeTeam,
.awayTeam {
  img {
    width: 100px;
  }
}
</style>
