const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './js/init',

  output: {
    path: __dirname + '/docs',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      // { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  watchOptions: {
    ignored: /node_modules/
  },

  plugins: [
    new FaviconsWebpackPlugin({
      logo: './ded-icon.png',
      persistentCache: true,
      inject: true,
      title: 'Walking Ded Moroz',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        favicons: true,
        firefox: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./docs'] }
    })
  ]
}
