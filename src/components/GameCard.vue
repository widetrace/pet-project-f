<template>
  <div class="game">
    <h1><slot></slot></h1>
  </div>
</template>

<script>
export default {
  props: ["game", "gameStatus"],
  beforeMount() {
    console.log(this.game);
  }
};
</script>

<style lang="scss" scoped>
</style>
