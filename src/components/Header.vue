<template lang="pug">
#header
  img(:src="leagueIcon")
  h1 Blackhawks web app
  img(
    src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-dark/16.svg"
  )
</template>

<script>
export default {
  setup() {
    // eslint-disable-next-line global-require
    const leagueIcon = require('@/assets/LeagueIcon.svg');
    fetch('https://www-league.nhlstatic.com/images/logos/teams-current-primary-dark/15.svg')
      .then((response) => {
        console.log(response);
        if (response.ok) return response;
        throw new Error('Network response was not ok.');
      })
      .then((data) => console.log(data.contents));

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
