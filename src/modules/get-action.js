const more = 'Use the `--help` option to learn more.';

function makeGetAction({ processArgv, supportedActions, printer }) {
  return function getAction() {
    const [, , action] = processArgv;

    if (!action) {
      return printer.die(
        `To use this script, you must select an action. ${more}`
      );
    }

    if (!supportedActions.includes(action)) {
      return printer.die(
        // istanbul ignore next
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
