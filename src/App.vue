<template>
  <div id="app">
    <div id="header">
      My nhl web app
    </div>
    <div id="nav">
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/about">
        About
      </router-link>
    </div>
    <router-view id="main" />
    <div id="latest-news">
      <p>Latest news here</p>
    </div>
    <div id="footer">
      <span>made by widetrace. thanks to NHL Api</span>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Montserrat;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main news"
    "footer footer footer";
}

#header {
  grid-area: header;
}

#nav {
  grid-area: nav;
  padding: 30px;
  display: flex;
  flex-flow: column nowrap;
  a {
    font-weight: bold;
    color: $primary;

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
}

#footer {
  grid-area: footer;
}
</style>
