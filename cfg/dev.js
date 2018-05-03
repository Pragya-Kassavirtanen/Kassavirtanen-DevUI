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
    app: [
      'whatwg-fetch',
      'babel-polyfill',
      'webpack-dev-server/client?http://127.0.0.1:' +defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    silentRenew: ['./src/silentRenew/silentRenew']
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new Dotenv({
      path: './.env.dev',
      safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
})

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
})

module.exports = config
