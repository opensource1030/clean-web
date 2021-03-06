// const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const features = config.dev.env.FEATURESV

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.ProvidePlugin({
      Promise: ['es6-promise', 'Promise']
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config.dev.env),
      'features': features
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    // new FriendlyErrorsPlugin()
  ]
})

module.exports = webpackConfig
