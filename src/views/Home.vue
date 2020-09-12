<template lang="pug">
  .home
    GameCard(
      v-if="nextGameStatus",
      :game="nextGame"
      game-status="next") {{ nextTitle }}
    EmptyCard(v-else) No info about next game
    GameCard(
      v-if="prevGameStatus",
      :game="gameInfo('previous')",
      game-status="previous") {{ prevTitle }}
    EmptyCard(v-else) No info about previous game
</template>

<script>
// @ is an alias to /src
import GameCard from '@/components/GameCard.vue';
import EmptyCard from '@/components/EmptyCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    prevGameStatus: false,
    nextGameStatus: false,
  }),
  components: {
    GameCard, EmptyCard,
  },
  methods: {
    getNextTitle() {
      this.$store
        .dispatch('game/fetchRecapText', {
          link: this.nextGame.content.link,
          status: 'next',
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    },
  },
  computed: {
    ...mapGetters(
      {
        gameInfo: 'game/info',
        gameTitle: 'game/title',
      },
    ),
    prevGame() {
      return this.gameInfo('previous');
    },
    prevTitle() {
      return this.gameTitle('previous');
    },
    nextGame() {
      return this.gameInfo('next');
    },
    nextTitle() {
      // title from api still testing
      // this.getNextTitle()
      return `${this.nextGame.teams.home.team.name} will face ${this.nextGame.teams.away.team.name} at ${this.nextGame.venue.name}`;
    },

  },
  created() {
    this.$store.dispatch('game/getInfo', 'previous')
      .then((res) => {
        if (res === false) {
          this.prevGameStatus = false;
        } else {
          this.prevGameStatus = true;
        }
      });
    this.$store.dispatch('game/getInfo', 'next')
      .then((res) => {
        if (res === false) {
          this.nextGameStatus = false;
        } else {
          this.nextGameStatus = true;
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  div:first-child {
    margin-right: 25px;
  }
}

@media screen and (max-width: 1280px) {
  .home {
    flex-flow: column nowrap;
    div:first-child {
      margin-right: 0px;
      margin-bottom: 15px;
  }
  }
}
</style>
