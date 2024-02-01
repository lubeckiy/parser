// webpack.config.js
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background/main.js',
    content: './src/content/index.js',
    popup: './src/popup/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'static/js/[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Grabli plugin popup page.',
      template: './src/popup_template.ejs',
      filename: 'static/popup.html',
      publicPath: '/',
      chunks: ['popup'],
      inject: 'body',                  
    }),
    new CopyWebpackPlugin({
        patterns: [
        {
          from: path.resolve(__dirname, 'static'),
          to: 'static'
        },
        {
          from: path.resolve(__dirname, 'src/manifest.json'),
          to: 'manifest.json'
        },
        {
          from: path.resolve(__dirname, 'src/worker_wrapper.js'),
          to: 'worker_wrapper.js'
        },
        {
          from: path.resolve(__dirname, 'src/interceptor/index.js'),
          to: 'static/js/interceptor.js',
        },
  ]}),
  ],
};
