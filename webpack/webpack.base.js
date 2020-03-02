const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

const baseConfig = {
  devtool: isProduction === true ? 'source-map' : 'eval-source-map',
  mode: isProduction === true ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|lib)/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
            sass: [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|lib)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|woff(2)?|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    alias: {
      '~app': path.resolve(__dirname, '../app'),
      '~assets': path.resolve(__dirname, '../app/assets'),
      '~components': path.resolve(__dirname, '../app/components'),
      '~config': path.resolve(__dirname, '../config'),
      '~store': path.resolve(__dirname, '../app/store'),
      '~plugins': path.resolve(__dirname, '../app/plugins'),
      '~routes': path.resolve(__dirname, '../app/routes'),
      '~sass': path.resolve(__dirname, '../app/sass'),
      '~server': path.resolve(__dirname, '../server')
    },
    extensions: ['*', '.js', '.vue', '.json']
  }
}

module.exports = baseConfig
