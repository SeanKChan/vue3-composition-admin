/*
 * @Description:配置文件
 * @Author: ZY
 * @Date: 2020-12-07 11:41:22
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 15:17:29
 */
const { resolve } = require('path')
const path = require('path')
const WebpackBar = require('webpackbar');
const dayjs = require('dayjs')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_UPDATE_TIME = time
const  {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  devPort,
} = require('./src/config/default/vue.custom.config')
module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
      ]
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@', resolve('src'))
    .set('*', resolve(''))
    .set('Assets', resolve('src/assets'))

    config.module
      .rule("mjs")
      .test(/\.mjs$/)
      .type("javascript/auto")
      .include.add(/node_modules/)
        .end()

    config.module
      .rule('json5|yaml')
      .test(/\.(json5?|ya?ml)$/)
      .include.add(path.resolve(__dirname, 'src/lang'))
        .end()
      .use('vue-i18n')
        .loader('@intlify/vue-i18n-loader')


    config.plugin('webpackbar')
      .use(WebpackBar, [{name: title}])
  }
}
