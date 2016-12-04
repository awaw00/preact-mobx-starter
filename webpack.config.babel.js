import path from 'path';
import cssnano from 'cssnano';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __DEV__ = process.env.NODE_ENV === 'development';

let devtool = 'cheap-module-eval-source-map';

const root = (_path = '.') => path.join(__dirname, _path);

const entry = {
  app: [root('./src/index.js')]
};

const resolve = {
  extensions: ['', '.js', '.jsx'],
  root: root('./src'),
  alias: {
    'react': 'preact-compat/dist/preact-compat.js',
    'react-dom': 'preact-compat/dist/preact-compat.js'
  }
};

const output = {
  path: root('./dist'),
  filename: '[name].[hash].js',
  publicPath: '/'
};

const baseCssLoader =
  'css-loader?sourceMap&-minimize&' +
  'modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]';

const loaders = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  { test: /\.woff(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
];

const postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
];

const plugins = [
  new webpack.DefinePlugin({
    __DEV__
  }),
  new HtmlWebpackPlugin({
    template: root('./src/index.ejs'),
    filename: root('./dist/index.html'),
    title: 'Preact Starter',
    inject: 'body'
  })
];

if (__DEV__) {
  entry.app.unshift(root('./build/dev-client.js'));

  loaders.push(
    {
      test: /\.css$/,
      loader: 'style-loader!' + baseCssLoader + '!postcss-loader',
      exclude: null
    },
    {
      test: /\.less$/,
      loader: 'style-loader!' + baseCssLoader + '!less-loader!postcss-loader',
      exclude: null
    }
  );

  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else {
  devtool = 'source-map';

  entry.vendor = [
    'preact',
    'preact-compat/dist/preact-compat.js',
    'react-router',
    'mobx',
    'mobx-react'
  ];

  loaders.push(
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', baseCssLoader + '!postcss-loader'),
      exclude: null
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', baseCssLoader + '!less-loader!postcss-loader'),
      exclude: null
    }
  );

  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {from: root('./static'), to: 'static'}
    ])
  );
}

export default {
  devtool,
  entry,
  resolve,
  output,
  module: {
    loaders
  },
  plugins,
  postcss
};
