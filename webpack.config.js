const path = require('path')
const HTMLWebpackPlugins = require('html-webpack-plugin')

module.exports = {
  entry: './test/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    inline: true,
    hot: true,
    open: true,
    port: 3000
  },
  plugins: [
    new HTMLWebpackPlugins({
      filename: 'index.html',
      template: './index.html',
      inject: true
    })
  ]
}