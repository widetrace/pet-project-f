<template lang="pug">
  .empty-card
    h1
      slot
</template>

<style lang="scss">
.empty-card {
  border-radius: 4px;
  box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
  background-color: white;
}
</style>
