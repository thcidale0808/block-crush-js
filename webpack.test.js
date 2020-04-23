const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './test/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  devServer: {
    port: 3002,
    hot: true,
    open: true
  },

  module: {
    rules: [
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [new HtmlWebpackPlugin({ template: './app/index.html' })]
};
