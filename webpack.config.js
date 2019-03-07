const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  watch: true,
  output: {
    filename: 'authenticate.js',
    path: path.resolve(__dirname, 'assets/js')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: ['css-loader'],
    }]
  }
};
