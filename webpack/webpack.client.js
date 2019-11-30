const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const clientConfig = {
  entry: './app/entry-client.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/public/',
    filename: 'build.js'
  }
}

module.exports = () => {
  return merge(baseConfig, clientConfig)
}
