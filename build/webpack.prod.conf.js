const path = require(`path`);
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require(`optimize-css-assets-webpack-plugin`);
var HtmlWebpackPlugin = require('html-webpack-plugin')

var env = config.build.env
var features = config.build.env.FEATURESV

var webpackConfig = merge(baseWebpackConfig, {
  mode: `production`,
  optimization: {
    splitChunks: {
      // Must be specified for HtmlWebpackPlugin to work correctly.
      // See: https://github.com/jantimon/html-webpack-plugin/issues/882
      chunks: `all`,
    },
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
      'features': features
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
});

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
