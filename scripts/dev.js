const chalk = require('chalk');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// webpack 配置文件
const webpackConfig = require('../config/webpack.config');
const clearConsole = require('./util/clearConsole');
const { createCompiler } = require('./util/WebpackDevServerutils');

const isInteractive = process.stdout.isTTY;
const appName = 'webpack-project',
  urls = {
    localUrlForTerminal: '127.0.0.1:12350'
  },
  useYarn = 'yarn build';
// webpack 编译
const compiler = createCompiler(webpack, webpackConfig, appName, urls, useYarn);
// webpack-dev-server 配置
const devServer = new WebpackDevServer(compiler, {
  quiet: true,
  overlay: false,
});

devServer.listen(12350, 'localhost', err => {
  if (err) {
    console.error(err);
  }

  if (isInteractive) {
    clearConsole();
  }
  console.log(chalk.cyan('Starting the development server...\n'));
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});