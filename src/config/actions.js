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
    name: 'help',
    aliases: ['--help', '-h']
  }
];

module.exports = {
  supportedActions
};
