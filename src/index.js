const { makeModules } = require('./modules');

const SUPPORTED_ACTIONS = ['all', 'select'];

function run() {
  const { getAction } = makeModules({
    supportedActions: SUPPORTED_ACTIONS
  });

  const selectedAction = getAction();
  console.log(selectedAction);
}

module.exports = {
  run
};
