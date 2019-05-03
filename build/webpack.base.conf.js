const { VueLoaderPlugin } = require(`vue-loader`);
const nodeSassMagicImporter = require(`node-sass-magic-importer`);
const path = require(`path`);
const utils = require(`./utils`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const OptimizeCSSAssetsPlugin = require(`optimize-css-assets-webpack-plugin`);
const UglifyJsPlugin = require(`uglifyjs-webpack-plugin`);

const env = process.env.NODE_ENV;
const minify = env === `production`;
const sourceMap = env === `development`;

const webpackConfig = {
  entry: path.resolve(__dirname, '../src/main.js'),
  mode: env,
  output: {
    publicPath: `/`,
  },
  devtool: sourceMap ? `cheap-module-eval-source-map` : undefined,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: `vue-loader`,
      },
      {
        test: /\.js$/,
        loader: `babel-loader`,
        include: [path.resolve(__dirname, `../src`)],
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /\.s?css$/,
      //   use: [
      //     `vue-style-loader`,
      //     {
      //       loader: `css-loader`,
      //       options: {
      //         sourceMap,
      //       },
      //     },
      //     {
      //       loader: `sass-loader`,
      //       options: {
      //         importer: nodeSassMagicImporter(),
      //         sourceMap,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};

// if (env !== `development`) {
//   webpackConfig.plugins.push(new MiniCssExtractPlugin());
//   const sassLoader = webpackConfig.module.rules.find(({ test }) => test.test(`.scss`));
//   // Replace the `vue-style-loader` with
//   // the MiniCssExtractPlugin loader.
//   sassLoader.use[0] = MiniCssExtractPlugin.loader;
// }

module.exports = webpackConfig;
