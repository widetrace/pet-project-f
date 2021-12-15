<template lang="pug">
#home
  #game-block
    template(v-if="data")
      MatchBlock(
        v-for="(item, index) in data.dates",
        :key="index",
        :item="item"
      )
    template(v-else)
      h2 No games
</template>

<script>
import { reactive, toRefs } from 'vue';
import { subDays, add, format } from 'date-fns';
import axios from 'axios';

import MatchBlock from '@/components/MatchBlock.vue';

export default {
  components: {
    MatchBlock,
  },
  setup() {
    const state = reactive({
      data: null,
    });

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
    };
  },
};
</script>

<style lang="scss" scoped>
#game-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
}
</style>
