<template lang="pug">
#home
  #game-block
    template(v-if="isReady")
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
import { useStore } from 'vuex';

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

    const store = useStore();

    const date = new Date();

    const ago = twoWeeksAgo(date);
    const ahead = twoWeeksAhead(date);

    nextTick(async () => {
      await store.dispatch('schedule/fetchSchedule', { startDate: ago, endDate: ahead });
      state.data = store.getters['schedule/games'];
      state.isReady = true;
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
