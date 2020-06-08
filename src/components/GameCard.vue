<template>
  <div class="game">
    <h1>
      <slot></slot>
    </h1>
    <div class="team-away">
      <img :src="awayTeamLogo" alt="Away team logo" />
    </div>
    <div class="team-home">
      <img :src="homeTeamLogo" alt="Home team logo" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["game", "gameStatus"],
  beforeMount() {
    console.log(this.game);
  },
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
img {
  width: 150px;
}
</style>
