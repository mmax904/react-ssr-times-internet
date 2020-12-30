const path = require('path');
const merge = require('webpack-merge').merge;
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./webpack.base.js');

const config = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};

module.exports = merge(baseConfig, config);