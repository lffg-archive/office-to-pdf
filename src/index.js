const { makeModules } = require('./modules');

const SUPPORTED_ACTIONS = ['all', 'select'];

async function run() {
  const { getAction, getFiles } = makeModules({
    supportedActions: SUPPORTED_ACTIONS
  });

  const selectedAction = getAction();

  const files = await getFiles({
    showSelect: selectedAction === 'select',
    directory: process.cwd()
  });

  console.log(files);
}

module.exports = {
  run
};
