<template lang="pug">
  .news-card
    .preview
      img(:src="preview" object-fit="cover")
    .text
      .title {{ text.title }}
      .info {{ text.info }}
</template>

<script>
export default {
  data: () => ({
    preview: 'https://sun1-83.userapi.com/iDXXy82bn9FRF3WlWo9qBCX9ZBoGy-1oHqsNtw/2f5AeR2MxDQ.jpg',
    text: {
      title: 'Check-check',
      info: 'Check',
    },
  }),
};
</script>

<style lang="scss">
.news-card {
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  width: 100%;
  height: 20vh;
}

.preview {
  width: 40%;
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    left: 0;
  }
}
</style>
