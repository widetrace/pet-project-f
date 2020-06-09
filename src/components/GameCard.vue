<template>
  <div class="game">
    <h1>
      <slot></slot>
    </h1>
    <div class="team-away">
      <img :src="awayTeamLogo" alt="Away team logo" />
      <p>{{ game.teams.away.score }}</p>
    </div>
    <div class="team-home">
      <img :src="homeTeamLogo" alt="Home team logo" />
      <p>{{ game.teams.home.score }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["game", "gameStatus"],
  computed: {
    awayTeamLogo() {
      return this.$store.getters["logo/url"](this.game.teams.away.team.id);
    },
    homeTeamLogo() {
      return this.$store.getters["logo/url"](this.game.teams.home.team.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
  display: grid;
  grid-template-areas: 
  "title title"
  "away home";
  h1 {
    grid-area: title;
  }
}

.team-away {
  grid-area: away;
}

.team-home {
  grid-area: home;
}

img {
  width: 150px;
}
</style>
