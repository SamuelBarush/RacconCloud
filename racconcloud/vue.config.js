const fs = require('fs')
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
    host: 'racooncloud.me',
    port: 443,
    allowedHosts:"all",
    https:{
      key: fs.readFileSync('./ssl/racooncloud_me.key'),
      cert: fs.readFileSync('./ssl/racooncloud_me.crt'),
      ca: fs.readFileSync('./ssl/racooncloud_me.ca-bundle')
    }
  }
})