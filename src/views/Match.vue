<template lang='pug'>
div
  h1 Match page
  template(v-if="isReady")
    h3 Three stars of the match
    div(v-for="(item, index) in stars", :key="item.id")
      | {{ starString(index) }}{{ item.fullName }}
    div
      h2 First period
      ScoreBlock(
        v-for="(item, index) in returnPeriodScore(1)",
        :key="index",
        :scoreData="item"
      )
    div
      h2 Second period
      ScoreBlock(
        v-for="(item, index) in returnPeriodScore(2)",
        :key="index",
        :scoreData="item"
      )
    div
      h2 Third period
      ScoreBlock(
        v-for="(item, index) in returnPeriodScore(3)",
        :key="index",
        :scoreData="item"
      )
    div
      h2 Overtime
      ScoreBlock(
        v-for="(item, index) in returnPeriodScore(4)",
        :key="index",
        :scoreData="item"
      )
  template(v-else)
    p Loading
</template>

<script>
/* eslint-disable max-len */
import axios from 'axios';
import { computed, nextTick, ref } from 'vue';
import ScoreBlock from '@/components/ScoreBlock.vue';

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    ScoreBlock,
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
