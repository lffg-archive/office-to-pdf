const fs = require('fs');
const printer = require('../utils/printer');
const { makeGetAction } = require('./get-action');
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

  return {
    getAction,
    readdir
  };
}

module.exports = {
  makeModules
};
