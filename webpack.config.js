// webpack.config.js
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content.js',
    popup: './src/popup.js',
    background: './src/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json', to: path.resolve(__dirname, 'dist/manifest.json') },
        { from: './src/images', to: path.resolve(__dirname, 'dist/images') },
        { from: './src/popup.html', to: path.resolve(__dirname, 'dist/popup.html') },
      ],
    }),
  ],
};
