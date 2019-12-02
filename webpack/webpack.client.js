const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { VueSSRClientPlugin } = require('vue-ssr-webpack-plugin')

const baseConfig = require('./webpack.base')
const isProduction = process.env.NODE_ENV === 'production'

let clientConfig = {
  entry: './app/entry-client.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/public/',
    filename: 'build.js'
  },
  // optimization: {
  //   splitChunks: {
  //     minChunks: Infinity
  //   }
  // },
  plugins: [new VueSSRClientPlugin()]
}

if (!isProduction) {
  clientConfig = merge(clientConfig, {
    devServer: {
      writeToDisk: true,
      contentBase: path.resolve(__dirname, '../public'),
      publicPath: '/public/',
      historyApiFallback: true,
      hot: true,
      inline: true,
      proxy: {
        '^/api/*': {
          target: 'http://localhost:3000/api/',
          secure: false
        }
      }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  })
}

module.exports = () => {
  return merge(baseConfig, clientConfig)
}
