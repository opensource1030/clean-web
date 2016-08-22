var webpack = require('webpack')

module.exports =  {
  entry: [
    './scripts/app.js'
  ],
  output: {
    path: "/dest/js",
     publicPath: '/dest/images/',
    filename: "bundle.js"
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules|vue\/src|vue-router\//,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },

      {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
    ]
  }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    modulesDirectories: ['node_modules']
  }
}
