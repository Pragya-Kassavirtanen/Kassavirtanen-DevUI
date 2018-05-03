'use strict'
const Dotenv = require('dotenv-webpack')

let path = require('path')
let webpack = require('webpack')

let baseConfig = require('./base')
let defaultSettings = require('./defaults')

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin')

let config = Object.assign({}, baseConfig, {
  entry: {
    app: [ 'babel-polyfill', './src/index' ],
    silentRenew: ['./src/silentRenew/silentRenew']
  },
  cache: false,
  //devtool: 'sourcemap',
  plugins: [
    new Dotenv({
      path: './.env.dist',
      safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: defaultSettings.getDefaultModules()
})

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
})

module.exports = config
