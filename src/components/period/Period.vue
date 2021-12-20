<template lang="pug">
.period
  h2 {{ periodTitle }}
  template(v-if="item.length")
    ScoreBlock(v-for="(play, index) in item", :key="index", :scoreData="play")
  template(v-else)
    p No one scores in this period
</template>

<script setup>
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { computed } from 'vue';
import ScoreBlock from '@/components/period/ScoreBlock.vue';

const props = defineProps({
  index: String,
  item: Object,
});

const periodTitle = computed(() => {
  switch (props.index) {
    case 'first':
      return 'First Period:';
    case 'second':
      return 'Second Period:';
    case 'third':
      return 'Third Period:';
    case 'ot':
      return 'Overtime:';
    default:
      return 'Other scores';
  }
});
</script>

<style lang="scss" scoped>
</style>
