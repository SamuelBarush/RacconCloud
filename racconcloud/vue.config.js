const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css:{
    loaderOptions:{
      sass:{
        additionalData:`
        @import "@/sass/_variables.scss";
        @import "@/sass/_fonts.scss";
        @import "@/sass/_main.scss";
        `
      }
    }
  },
  devServer:{
    host: '0.0.0.0',
    port: 8080,
    allowedHosts:"all",
  }
})