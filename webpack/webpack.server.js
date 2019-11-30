const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

const baseConfig = require('./webpack.base')

const serverConfig = {
  target: 'node',
  entry: './app/entry-server.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/public/',
    filename: 'build.js',
    // Outputs node-compatible modules instead of browser-compatible.
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: /\.css$/
  }),
  plugins: [new VueSSRPlugin()]
}

module.exports = () => {
  return merge(baseConfig, serverConfig)
}
