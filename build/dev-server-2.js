#!/usr/bin/env node
const serve = require(`webpack-serve`);

const openBrowser = require(`./lib/open-browser`);
const webpackConfig = require('./webpack.dev.conf')

serve({ webpackConfig, clipboard: false }).then((server) => {
  server.on(`listening`, () => {
    openBrowser(`http://${server.options.host}:${server.options.port}`);
  });
});
