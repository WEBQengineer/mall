const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('pages', path.join(__dirname, './src/pages'))
      .set('styles', path.join(__dirname, './src/assets/styles'))
      .set('scss', path.join(__dirname, './src/assets/scss'))
      .set('components', path.join(__dirname, './src/components'))
  }
}