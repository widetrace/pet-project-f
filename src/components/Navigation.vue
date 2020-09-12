<template lang="pug">
#nav
  #nav-menu
    h2 Menu
    router-link(to="/") Home
    router-link(to="/about") About
  #nav-social
    a(href="#")
      icon-base(width="36px", height="36px", iconName="VK public")
        icon-vk
    a(href="#")
      icon-base(width="36px", height="36px", iconName="TG chat")
        icon-telegram
</template>

<script>
import IconVk from '@/components/icons/IconVk.vue';
import IconTelegram from '@/components/icons/IconTelegram.vue';

export default {
  components: {
    IconVk, IconTelegram,
  },
};
</script>

<style lang="scss" scoped>
#nav {
  grid-area: nav;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  &-menu {
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    a {
      font-weight: bold;
      color: $primary;
      text-decoration: none;
      width: 100%;
      padding-top: 15px;
      padding-bottom: 15px;
      &:hover {
        text-decoration: underline;
        background-color: #f3f3f3;
      }
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  &-social {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    a {
      height: 50px;
    }
  }
}

h2 {
   border-top-right-radius: 4px;
 }
</style>
