<template>
  <div class="home">
    <GameCard
      v-if="prevGame && prevTitle"
      :game="prevGame"
      game-status="previous"
    >
      {{ prevTitle }}
    </GameCard>

    <GameCard
      v-else
      :game="null"
      game-status="previous"
    >
      <span> No info about previous game </span>
    </GameCard>

    <GameCard
      v-if="nextGame"
      :game="nextGame"
      game-status="next"
    >
      {{ nextTitle }}
    </GameCard>

    <GameCard
      v-else
      :game="null"
      game-status="next"
    >
      <span> No info about next game </span>
    </GameCard>
  </div>
</template>

<script>
// @ is an alias to /src
import GameCard from '@/components/GameCard.vue';

export default {
  name: 'Home',
  components: {
    GameCard,
  },
  data: () => ({
    // test: 'test'
  }),
  methods: {
    getPrevTitle() {
      this.$store
        .dispatch('game/fetchRecapText', {
          link: this.prevGame.content.link,
          status: 'previous',
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    },
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
    prevGame() {
      return this.$store.getters['game/info']('previous');
    },
    prevTitle() {
      return this.$store.getters['game/title']('previous');
    },
    nextGame() {
      return this.$store.getters['game/info']('next');
    },
    nextTitle() {
      // title from api still testing
      // this.getNextTitle()
      return `${this.nextGame.teams.home.team.name} will face ${this.nextGame.teams.away.team.name} at ${this.nextGame.venue.name}`;
    },
  },
  created() {
    this.$store
      .dispatch('game/fetchInfo', 'previous')
      .then(() => {
        this.getPrevTitle();
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
    this.$store
      .dispatch('game/fetchInfo', 'next')
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 1fr 1fr;
}
</style>
