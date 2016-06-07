import path from 'path';
import webpack from 'webpack';

const ISDEV = process.env.NODE_ENV !== 'production';

const config = {
  context: __dirname,
  entry: {
    birthday: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'static/'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  resolve: {
    root: [
      path.resolve('./src'),
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
    ],
    noParse: 'TweenMax.min*',
  },
  externals: {
    'jquery': 'jQuery',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      ISDEV: JSON.stringify(ISDEV),
    }),
    new webpack.optimize.DedupePlugin(),
  ],
  devServer: {
    port: 8081,
    devtool: true,
    colors: true,
    progress: true,
    host: '0.0.0.0',
  },
};

if (ISDEV) config.devtool = 'source-map';

export default config;
