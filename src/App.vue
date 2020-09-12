<template lang="pug">
  #app
    #header
      router-link(to="/")
        icon-base(width="100px", height="100px", iconColor="black", iconTitle="NHL Logo")
          icon-league
      h1 NHL Web App
      .smth
    navigation
    router-view#main
    #latest-news
      h2 Latest news
    #footer
      span Made by widetrace. Thanks to NHL Api
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import IconLeague from '@/components/icons/IconLeague.vue';

export default {
  components: {
    Navigation, IconLeague,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Montserrat;
  min-height: 100vh;
  text-align: center;
  color: $primary;
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main news"
    "footer footer footer";
  grid-template-columns: 0.33fr 2fr 1fr;
  grid-template-rows: 0.33fr 4fr 0.33fr;
  grid-gap: 3vh 5vw;
  background-color: $background;
}

#header,
#nav,
#footer,
#latest-news {
  border-radius: 4px;
  box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
  background-color: white;
}

#header {
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

#main {
  grid-area: main;
}

#latest-news {
  grid-area: news;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

#footer {
  grid-area: footer;
  background-color: white;
  padding-top: 10px;
  span {
    margin: 10px;
  }
}

h2 {
  width: 100%;
  background-color: $background;
  padding-top: 0.83em;
  padding-bottom: 0.83em;
  margin: 0;
}

@media screen and (max-width: 1280px) {
  #app {
    grid-gap: 3vh 2.5vw;
    grid-template-columns: 0.33fr 3.33fr 1fr;
  }
}
</style>
