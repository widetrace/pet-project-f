<template lang="pug">
  .invalid-page
    h1 404 Not Found
    h3 Page doesn't exist
    router-link(:to="{name: 'Home'}") Back to home page
</template>
