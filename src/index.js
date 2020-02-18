const { makeModules } = require('./modules');

const SUPPORTED_ACTIONS = ['all', 'select', '--help'];

async function run() {
  const { getAction, getFiles } = makeModules({
    supportedActions: SUPPORTED_ACTIONS
  });

  const selectedAction = getAction();

  if (selectedAction === '--help') {
    console.log('TODO: Write some help information.');
    return;
  }

  const files = await getFiles({
    showSelect: selectedAction === 'select',
    directory: process.cwd()
  });

  console.log(files);
}

module.exports = {
  run
};
