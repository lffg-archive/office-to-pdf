const { SELECT_ACTION, ALLOW_DOTFILES_FLAG } = require('./config/actions');
const { getAction, getFiles } = require('./modules');

async function run() {
  const { selectedAction, activeFlags } = getAction();

  if (selectedAction === 'help') {
    console.log('TODO: Write some help information.');
    return;
  }

  const files = await getFiles({
    allowDotFiles: activeFlags.includes(ALLOW_DOTFILES_FLAG),
    showSelect: selectedAction === SELECT_ACTION,
    directory: process.cwd()
  });

  console.log(files);
}

module.exports = {
  run
};
