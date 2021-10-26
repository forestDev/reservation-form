module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/reservation-form/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/_index.scss";
          `,
      },
    },
  },
};
