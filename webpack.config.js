'use strict';

let webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './app'
  },
  output: {
    path: __dirname + "/dist",
    filename: "main.js",
    library: 'devWFT'
  },
  devtool: "eval", // "cheap-module-source-map",
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        }
      },{
        test: /\.css$/, loader: "style-loader!css-loader"
      }
      // ,{
      //   test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
      //   loader: "imports?this=>window"
      // }
    ]
  },
  resolve: {
    alias: {
      jquery: __dirname + "/src/libs/jquery-2.2.0.min",
      paper: __dirname + "/src/libs/paper/paper-full.min",
      d3: __dirname + "/src/libs/d3/d3.min"
    }
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery"
    // }),
    new webpack.NoErrorsPlugin()
    ,new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}
