module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/_fonts.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
};
