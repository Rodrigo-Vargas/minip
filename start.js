var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var port = 8000;

process.env.NODE_ENV = 'development';

require('dotenv')

var config = require('./webpack.config.dev');

var compiler = webpack(config);

var devServer = new WebpackDevServer(compiler, {});

// Launch WebpackDevServer.
devServer.listen(port, (err, result) => {
  if (err) {
    return console.log(err);
  }

  console.log('Starting the development server...');
});