<template>
  <div class="game">
    <h1>
      <slot></slot>
    </h1>
    <div class="team-away">
      <img :src="awayTeamLogo" alt="Away team logo" />
      <p v-if="gameStatus == 'previous'">{{ game.teams.away.score }}</p>
    </div>
    <div class="team-home">
      <img :src="homeTeamLogo" alt="Home team logo" />
      <p v-if="gameStatus == 'previous'">{{ game.teams.home.score }}</p>
    </div>
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["game", "gameStatus"],
  computed: {
    awayTeamLogo() {
      return this.$store.getters["logo/url"](this.game.teams.away.team.id);
    },
    homeTeamLogo() {
      return this.$store.getters["logo/url"](this.game.teams.home.team.id);
    },
    date() {
      return moment(this.game.gameDate).format("DD.MM.YYYY");
    },
    time() {
      return moment(this.game.gameDate).format("HH:mm")
    }
  },
};
</script>

<style lang="scss" scoped>
.game {
  // height: 75vh;
  border-radius: 4px;
  box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
  background-color: white;
  display: grid;
  grid-template-rows: 
    minmax(75px, 0.33fr)
    minmax(150px, 1.67fr)
    minmax(50px, 0.33fr);
  grid-template-areas:
    "title title"
    "away home"
    "date time";
  h1 {
    margin: 0;
    padding: 10px;
    grid-area: title;
  }
}

.team-away, .team-home {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.team-away {
  grid-area: away;
}

.team-home {
  grid-area: home;
}

.date {
  grid-area: date;
}

.time {
  grid-area: time;
}

img {
  width: 150px;
}
</style>
