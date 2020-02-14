const more = 'Use the `--help` option to learn more.';

function makeGetAction({ supportedActions, printer }) {
  return function getAction() {
    const [, , action] = process.argv;

    if (!action) {
      printer.die(`To use this script, you must select an action. ${more}`);
    }

    if (!supportedActions.includes(action)) {
      printer.die(
        (chalk) =>
          chalk`The "{underline ${action}}" action is not supported. ${more}`
      );
    }

    return action;
  };
}

module.exports = {
  makeGetAction
};
