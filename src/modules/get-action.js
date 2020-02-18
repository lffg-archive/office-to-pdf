const more = 'Use `--help` to learn more.';

function findActionByNameOrAlias(actions, searchTerm) {
  return actions.find(
    ({ name, aliases = [] }) =>
      name === searchTerm || aliases.includes(searchTerm)
  );
}

function getActiveFlags(actionFlags = [], argvFlags = []) {
  return actionFlags.filter((flag) => argvFlags.includes(flag));
}

function makeGetAction({ processArgv, supportedActions, printer }) {
  return function getAction() {
    const [, , actionSearchTerm, ...flags] = processArgv;

    if (!actionSearchTerm) {
      return printer.die(
        `To use this script, you must select an action. ${more}`
      );
    }

    const action = findActionByNameOrAlias(supportedActions, actionSearchTerm);

    if (!action) {
      return printer.die(
        // istanbul ignore next
        (chalk) =>
          chalk`The "{underline ${actionSearchTerm}}" action is not supported. ${more}`
      );
    }

    const activeFlags = getActiveFlags(action.flags, flags);

    return {
      selectedAction: action.name,
      activeFlags
    };
  };
}

module.exports = {
  makeGetAction
};
