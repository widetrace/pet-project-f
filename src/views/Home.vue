<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <GameCard v-if="prevGame && prevTitle" :game="prevGame" gameStatus="previous">
      {{ prevTitle }}
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
  methods: {
    getPrevTitle() {
      this.$store
        .dispatch("game/fetchRecapText", {
          link: this.prevGame.content.link,
          status: "previous"
        })
        .catch(err => console.error(err));
    }
  },
  computed: {
    prevGame() {
      return this.$store.getters["game/info"]("previous");
    },
    prevTitle() {
      return this.$store.getters["game/title"]("previous");
    }
  },
  beforeMount() {
    this.$store
      .dispatch("game/fetchInfo", "previous")
      .then(() => {this.getPrevTitle()})
      .catch(err => console.error(err));
  }
};
</script>
