const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { VueSSRClientPlugin } = require('vue-ssr-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const baseConfig = require('./webpack.base')
const isProduction = process.env.NODE_ENV === 'production'

let clientConfig = {
  entry: './app/entry-client.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/public/',
    filename: '[name].js'
  },
  plugins: [
    new VueSSRClientPlugin(),
    ...(isProduction === true
      ? [
          /* eslint-disable indent */
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: path.resolve(
              __dirname,
              '../reports',
              'bundle-report-client.html'
            )
          })
        ]
      : [])
  ]
}

if (!isProduction) {
  clientConfig = merge(clientConfig, {
    output: {
      publicPath: 'http://localhost:8080/public/'
    },
    devServer: {
      writeToDisk: true,
      contentBase: path.resolve(__dirname, '../public'),
      publicPath: 'http://localhost:8080/public/',
      hot: true,
      inline: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  })
}

module.exports = () => {
  return merge(baseConfig, clientConfig)
}
