const fs = require('fs');
const { supportedActions } = require('../config/actions');
const printer = require('../utils/printer');
const { select } = require('../utils/select');
const { makeGetAction } = require('./get-action');
const { makeGetFiles } = require('./get-files');
const { makeReaddir } = require('./readdir');

const getAction = makeGetAction({
  processArgv: process.argv,
  supportedActions,
  printer
});

const readdir = makeReaddir({
  fs
});

const getFiles = makeGetFiles({
  readdir,
  select
});

module.exports = {
  getAction,
  readdir,
  getFiles
};
