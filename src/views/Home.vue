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
import { nextTick, reactive, toRefs } from 'vue';
import axios from 'axios';
import { twoWeeksAgo, twoWeeksAhead } from '@/use/dateFormat';

import MatchBlock from '@/components/MatchBlock.vue';

export default {
  components: {
    MatchBlock,
  },
  setup() {
    const state = reactive({
      data: null,
      isReady: false,
    });

    const date = new Date();

    const ago = twoWeeksAgo(date);
    const ahead = twoWeeksAhead(date);

    nextTick(async () => {
      const { data } = await axios.get(
        `https://statsapi.web.nhl.com/api/v1/schedule?teamId=16&startDate=${ago}&endDate=${ahead}`,
      );
      state.data = data;
    });

    return {
      ...toRefs(state),
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
