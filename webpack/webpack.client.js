/* eslint-disable indent */
const path = require('path')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const baseConfig = require('./webpack.base')
const isProduction = process.env.NODE_ENV === 'production'

let clientConfig = {
  entry: ['./app/entry-client.js'],
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, '../public/'),
    publicPath: '/public/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false
      }
    }
  },
  plugins: [
    new VueSSRClientPlugin(),
    ...(isProduction === true
      ? [
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
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      publicPath: 'http://localhost:8080/public/'
    },
    devServer: {
      writeToDisk: true,
      contentBase: path.resolve(__dirname, '../public'),
      publicPath: 'http://localhost:8080/public/',
      hot: true,
      noInfo: true,
      overlay: true,
      historyApiFallback: true,
      liveReload: false,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  })
}

module.exports = () => {
  return merge(baseConfig, clientConfig)
}
