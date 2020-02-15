const { MultiSelect } = require('enquirer');

async function select(choices, message, options = {}) {
  const prompt = new MultiSelect({
    message,
    choices,
    ...options,
    result(names) {
      return Object.values(this.map(names));
    }
  });

  const answer = await prompt.run();
  return answer;
}

module.exports = {
  select
};
