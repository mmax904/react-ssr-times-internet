const path = require('path');
const merge = require('webpack-merge').merge;
const baseConfig = require('./webpack.base.js');

const config = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};

module.exports = merge(baseConfig, config);