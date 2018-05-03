let webpackCfg = require('./webpack.config')

// Set node environment to testing
process.env.NODE_ENV = 'test'

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'PhantomJS' ],
    files: [
      'test/loadtests.js'
    ],
    port: 8000,
    captureTimeout: 60000,
    browserNoActivityTimeout: 100000,
    frameworks: [ 'mocha', 'chai' ],
    logLevel: config.LOG_DEBUG,
    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },
    singleRun: true,
    reporters: [ 'mocha', 'coverage' ],
    preprocessors: {
      'test/loadtests.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    },
    proxies: {
      '/images/': 'test/images/'
    },
    junitReporter: {
      outputDir: 'results'
    }
  })
}
