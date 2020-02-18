// Action names:
const names = {
  ALL_ACTION: 'all',
  SELECT_ACTION: 'select',
  HELP_ACTION: 'help'
};

// Action flags:
const flags = {
  ALLOW_DOTFILES_FLAG: '--allow-dotfiles'
};

// Definition:
const supportedActions = [
  {
    name: names.ALL_ACTION,
    flags: [flags.ALLOW_DOTFILES_FLAG]
  },
  {
    name: names.SELECT_ACTION,
    flags: [flags.ALLOW_DOTFILES_FLAG]
  },
  {
    name: names.HELP_ACTION,
    aliases: ['--help', '-h']
  }
];

module.exports = {
  ...names,
  ...flags,
  supportedActions
};
