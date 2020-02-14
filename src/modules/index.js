const printer = require('../utils/printer');
const { makeGetAction } = require('./get-action');

function makeModules({ supportedActions }) {
  return {
    getAction: makeGetAction({
      printer,
      supportedActions
    })
  };
}

module.exports = {
  makeModules
};
