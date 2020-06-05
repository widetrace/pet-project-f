<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  created() {
    this.$store
      .dispatch("game/fetchInfo", "previous")
      .then(() => {
        console.log(this.$store.getters["game/getInfo"]("previous"))
      })
      .catch(err => console.error(err));
  }
};
</script>
