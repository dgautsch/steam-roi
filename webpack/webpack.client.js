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
    devServer: {
      writeToDisk: true,
      contentBase: path.resolve(__dirname, '../public'),
      overlay: true,
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
