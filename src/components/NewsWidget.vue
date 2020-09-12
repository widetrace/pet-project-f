<template lang="pug">
  .news
    h2 Latest news
    .news-list
      news-card
</template>

<script>
import NewsCard from '@/components/NewsCard.vue';

export default {
  components: {
    NewsCard,
  },

};
</script>

<style lang="scss">
.news {
  width: 100%;
  height: 100%;
}
</style>
