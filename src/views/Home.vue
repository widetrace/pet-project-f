<template>
  <div class="home">
    <GameCard v-if="prevGame && prevTitle" :game="prevGame" gameStatus="previous">
      {{ prevTitle }}
    </GameCard>
    <GameCard v-if="nextGame" :game="nextGame" gameStatus="next"> 
      {{ nextTitle }}
    </GameCard>
  </div>
</template>

<script>
// @ is an alias to /src
import GameCard from "@/components/GameCard";

export default {
  name: "Home",
  components: {
    GameCard
  },  
  data: () => ({
    // test: 'test'
  }),
  methods: {
    getPrevTitle() {
      this.$store
        .dispatch("game/fetchRecapText", {
          link: this.prevGame.content.link,
          status: "previous"
        })
        .catch(err => console.error(err));
    },
    getNextTitle() {
      this.$store
        .dispatch("game/fetchRecapText", {
          link: this.nextGame.content.link,
          status: "next"
        })
        .catch(err => console.error(err))
    }
  },
  computed: {
    prevGame() {
      return this.$store.getters["game/info"]("previous");
    },
    prevTitle() {
      return this.$store.getters["game/title"]("previous");
    },
    nextGame() {
      return this.$store.getters["game/info"]("next");
    },
    nextTitle() {
      // title from api still testing
      // this.getNextTitle()
      return `${this.nextGame.teams.home.team.name} will face ${this.nextGame.teams.away.team.name} at ${this.nextGame.venue.name}`
    }
  },
  created() {
    this.$store.getters["logo/test"]
    this.$store
      .dispatch("game/fetchInfo", "previous")
      .then(() => {this.getPrevTitle()})
      .catch(err => console.error(err));
    this.$store
      .dispatch("game/fetchInfo", "next")
      .catch(err => console.error(err))
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 1fr 1fr;
  div {
    // height: 100%;
  }
}
</style>
