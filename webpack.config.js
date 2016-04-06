const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const gutil = require('gulp-util');
const path = require('path');

module.exports = {

  context: path.join(__dirname, 'src/scripts'),
  entry: {
    common: './common.js'
  },

  output: {
    path: __dirname + '/public_html/assets/scripts',
    filename: '[name].min.js',
    library: '[name]'
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src/scripts'
    ],
    root: [
      path.join(__dirname, 'src/scripts'),
      path.join(__dirname, 'src/templates')
    ],
    extensions: ['', '.js', '.jade'],
    alias: {}
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: !!gutil.env.dev ? 'inline-source-map' : null,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
    new webpack.ProvidePlugin({}),
    new WebpackNotifierPlugin({
      title: 'Webpack',
      alwaysNotify: false
    })
  ],

  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    emitError: true,
    emitWarning: true
  }
};
