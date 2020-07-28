import path from 'path';
import webpack from 'webpack';

module.exports = webpack({
  entry: path.resolve(__dirname, 'client', 'app.js'),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.(jpg|png|gif)$/,
        include: /assets/,
        loader: 'url',
      },
    ],
  },
  output: { filename: 'publicApp.js', path: '/' },
  devtool: 'source-map',
});
