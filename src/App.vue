<template lang="pug">
  #app
    #header
      h1 NHL Web App
    #nav
      h2 Menu
      router-link(to="/") Home
      router-link(to="/about") About
    router-view#main
    #latest-news
      h2 Latest news
    #footer
      span Made by widetrace. Thanks to NHL Api
</template>

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
  background-color: #f3f3f3;
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
}

#nav {
  grid-area: nav;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 30px;
  padding-top: 0;
  display: flex;
  flex-flow: column nowrap;
  a {
    font-weight: bold;
    color: $primary;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
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
</style>
