const { getAction, getFiles } = require('./modules');

async function run() {
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
