const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  mode: 'production',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  },

  devtool: 'source-map',

  entry: ['./js/init'],
  // entry: ['@babel/polyfill', './js/init'],

  output: {
    path: __dirname + '/docs',
    filename: 'bundle.js'
  },

  module: {
    rules: [
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
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              // sourceMap: true,
              importLoaders: 3,
              localIdentName: '[local]'
            }
          }
          // { loader: "file-loader" }
        ]
        // use: [
        //   { loader: "style-loader/url" },
        //   { loader: "file-loader" }
        // ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
        // loader: 'url-loader',
        // options: {
        //   limit: 10000,
        //   name: 'img/[name]-[sha512:hash:base64:7].[ext]'
        // }
      }
    ]
  },

  watchOptions: {
    ignored: /node_modules/
  },

  plugins: [
    new CleanWebpackPlugin(['docs']),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new FaviconsWebpackPlugin({
      logo: './ded-icon.png',
      persistentCache: true,
      inject: false,
      title: 'Walking Ded Moroz',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        favicons: true,
        firefox: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./docs'] }
    })
  ]
}
