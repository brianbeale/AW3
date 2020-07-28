import express from 'express';
import path from 'path';
import compiler from './webpack.compiler';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/public/',
  stats: { colors: true },
  noInfo: true,
});

app.use('/', express.static('./public'));

app.listen(3000, () => console.log(chalk.green(
  'App is now running on http://localhost:3000')
));
