<template lang="pug">
#header
  #header-title
    img(:src="leagueIcon")
    h1 Blackhawks web app
    img(
      src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-dark/16.svg"
    )
  #header-schedule
    //- Carousel(:items-to-show="2.5", v-if="data")
    //-   Slide(v-for="(item, index) in data.dates", :key="index")
    //-     MatchBlock(:item="item", :isHeader="true")
</template>

<script>
import { computed, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

import MatchBlock from '@/components/MatchBlock.vue';

export default {
  components: {
    Carousel,
    Slide,
    MatchBlock,
  },
  setup() {
    // eslint-disable-next-line global-require
    const leagueIcon = require('@/assets/LeagueIcon.svg');

    const state = reactive({
      data: null,
    });

    const store = useStore();

    // get ready for carousel
    state.data = computed(() => {
      if (store.getters['schedule/games']) {
        return store.getters['schedule/games'];
      }
      return null;
    });

    return {
      ...toRefs(state),
      leagueIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
#header {
  border-radius: 4px;
  box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
  background-color: white;
  display: flex;
  flex-flow: column nowrap;

  &-title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
  }

  img {
    height: 100px;
  }
}
</style>
