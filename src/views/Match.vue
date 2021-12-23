<template lang='pug'>
div
  h1 Match page
  template(v-if="isReady")
    h3 Three stars of the match
    div(v-for="(item, index) in stars", :key="item.id")
      p {{ starString(index) }}{{ item.fullName }}
    Period(
      v-for="(item, index) in playsByPeriods",
      :key="index",
      :item="item",
      :index="index"
    )
  template(v-else)
    p Loading
</template>

<script>
/* eslint-disable max-len */
import axios from 'axios';
import { computed, nextTick, ref } from 'vue';
import Period from '@/components/period/Period.vue';

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    Period,
  },
  setup(props) {
    const gameData = ref(null);
    const liveData = ref(null);
    const isReady = ref(false);
    const scorePlays = [];
    const playsByPeriods = {
      first: [],
      second: [],
      third: [],
      ot: [],
      other: [],
    };

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
          shotType: exactPlay.result.secondaryType,
          strength: exactPlay.result.strength.name,
          about: exactPlay.about,
        };
        scorePlays.push(goalData);
      });
    };

    const filterPlaysByPeriods = () => {
      scorePlays.forEach((play) => {
        switch (play.about.period) {
          case 1:
            playsByPeriods.first.push(play);
            break;
          case 2:
            playsByPeriods.second.push(play);
            break;
          case 3:
            playsByPeriods.third.push(play);
            break;
          case 4:
            playsByPeriods.ot.push(play);
            break;
          default:
            playsByPeriods.other.push(play);
            break;
        }
      });
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
      filterPlaysByPeriods();
      isReady.value = true;
    });

    return {
      isReady,
      homeTeam,
      awayTeam,
      stars,
      starString,
      playsByPeriods,
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
