<template lang="pug">
#page-body
  Header
  #nav
    p Navigation block
    router-link(:to="{ name: 'Home' }")
      | Home
    router-link(:to="{ name: 'Match', params: { id: 123 } }")
      | Match
  #content
    router-view
  #footer
    p footer
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
#app {
  background: #e2e1e0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

#page-body {
  display: grid;
  grid-template-areas:
    "header header"
    "nav main"
    "footer footer";
  grid-template-columns: 0.66fr 3fr;
  grid-template-rows: 115px 4fr 100px;
  grid-gap: 1rem;
}

#header {
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

#content,
#nav {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

#content {
  grid-area: main;
  margin-right: 4rem;
}

#footer {
  grid-area: footer;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  background: #fff;
}

#nav {
  margin-left: 4rem;
  grid-area: nav;
  padding: 30px;
  height: 15vh;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
