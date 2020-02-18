const { SELECT_ACTION } = require('./config/actions');
const { getAction, getFiles } = require('./modules');

async function run() {
  const { selectedAction } = getAction();

  if (selectedAction === 'help') {
    console.log('TODO: Write some help information.');
    return;
  }

  const files = await getFiles({
    showSelect: selectedAction === SELECT_ACTION,
    directory: process.cwd()
  });

  console.log(files);
}

module.exports = {
  run
};
