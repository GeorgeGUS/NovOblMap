// Для использования нужен Node.JS
// Поставьте webpack:
//   npm i -g webpack
// Поставьте babel-loader:
//   npm i babel-loader
// Запустите его в директории с файлами:
//   webpack

var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './js/init',

  output: {
    filename: 'bundle.js'
  },

  module: {
    // loaders: [
    //     { test: /\.json$/, loader: 'json-loader' },
    // ],
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./'] }
    })
  ]
}
