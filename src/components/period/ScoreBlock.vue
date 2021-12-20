<template lang="pug">
.score
  img(
    :src="`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${scoreData.teamId}.svg`"
  )
  p {{ scoreData.stat }} |
    |
    | {{ scoreData.scorer }} ({{ scoreData.scorerGoalsTotal }}).
    |
    | {{ scoreData.shotType }}.
    |
    | Assistants: {{ scoreData.assistants }}.
    |
    | Strength: {{ scoreData.strength }}.
    |
    | Time: {{ returnPeriodTime(scoreData.about) }}
</template>

<script>
export default {
  props: {
    scoreData: {
      type: Object,
      default: null,
    },
  },
  setup() {
    function returnPeriodTime({ period, periodTime }) {
      switch (period) {
        case 1:
          return periodTime;
        case 2: {
          const time = periodTime.split(':');
          return `${Number(time[0]) + 20}:${time[1]}`;
        }
        case 3: {
          const time = periodTime.split(':');
          return `${Number(time[0]) + 40}:${time[1]}`;
        }
        case 4: {
          const time = periodTime.split(':');
          return `${Number(time[0]) + 60}:${time[1]}`;
        }
        default:
          return '';
      }
    }

    return { returnPeriodTime };
  },
};
</script>

<style lang="scss" scoped>
.score {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  img {
    height: 50px;
  }
}
</style>
