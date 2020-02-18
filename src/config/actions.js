const supportedActions = [
  {
    name: 'all',
    flags: ['--allow-dotfiles']
  },
  {
    name: 'select',
    flags: ['--allow-dotfiles']
  },
  {
    name: '--help',
    aliases: ['help']
  }
];

module.exports = {
  supportedActions
};
