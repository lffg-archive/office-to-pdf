const fs = require('fs');
const printer = require('../utils/printer');
const { select } = require('../utils/select');
const { makeGetAction } = require('./get-action');
const { makeGetFiles } = require('./get-files');
const { makeReaddir } = require('./readdir');

function makeModules({ supportedActions }) {
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

  return {
    getAction,
    readdir,
    getFiles
  };
}

module.exports = {
  makeModules
};
