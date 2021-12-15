<template lang='pug'>
div
  h1 Match page {{ id }}
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    const { id } = route.params;
    return {
      id,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
