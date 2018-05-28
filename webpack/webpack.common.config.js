const Webpack = require('webpack');
const Path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.argv.indexOf('-p') >= 0;
const outPath = Path.join(__dirname, '../dist');
const sourcePath = Path.join(__dirname, '../src');

module.exports = {
  context: sourcePath,
  entry: {
    main: './index.tsx',
    vendor: ['react']
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'bundle.js'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['browser', 'main']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        use: isProduction
          ? 'awesome-typescript-loader?module=es6'
          : [
            'react-hot-loader/webpack',
            'awesome-typescript-loader'
          ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]'
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': isProduction === true ? JSON.stringify('production') : JSON.stringify('development')
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new Webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty'
  }
};
