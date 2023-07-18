// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './source/js/script.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'scripts.bundle.js',
  },
  plugins: [new MiniCssExtractPlugin({ filename: '../css/[name].css' })],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: [['@babel/preset-env']] },
        },
        resolve: {
          fullySpecified: false,
        },
      },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
    ],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
