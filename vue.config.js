const path = require('path');

module.exports = {
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      '/api':{
        target:'http://mall-pre.springboot.cn',
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('pages', path.join(__dirname, './src/pages'))
      .set('styles', path.join(__dirname, './src/assets/styles'))
      .set('scss', path.join(__dirname, './src/assets/scss'))
      .set('components', path.join(__dirname, './src/components'))
  }
}