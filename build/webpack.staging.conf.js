var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  mode: `production`,
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config.staging.env),
      'features': config.staging.env.FEATURESV
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // More options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
  ]
})

// webpackConfig.optimization.minimizer = [
//   new OptimizeCSSAssetsPlugin(),
//   // Enabled by default in production mode if
//   // the `minimizer` option isn't overridden.
//   new UglifyJsPlugin({
//     cache: true,
//     parallel: true,
//   }),
// ];

module.exports = webpackConfig
