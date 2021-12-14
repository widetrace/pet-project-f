<template lang="pug">
#header
  img(:src="leagueIcon")
  h1 Blackhawks web app
</template>

<script>
export default {
  setup() {
    // eslint-disable-next-line global-require
    const leagueIcon = require('@/assets/LeagueIcon.svg');
    return {
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
  padding: 0 15%;
  img {
    height: 100px;
  }
}
</style>
