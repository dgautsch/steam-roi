const path = require('path')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const PATHS = {
  app: path.join(__dirname, '../client'),
  public: path.join(__dirname, '../public')
}

const baseConfig = {
  entry: {
    app: PATHS.app + '/index.jsx'
  },
  output: {
    path: PATHS.public,
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|lib)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          mimetype: 'application/font-woff',
          name: './fonts/[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Loading production config...')
    return merge(baseConfig, prodConfig)
  }

  console.log('Loading development config...')
  return merge(baseConfig, devConfig)
}
