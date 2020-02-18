const { makeGetAction } = require('../get-action');

const createMock = (actionName, flags = []) => {
  const supportedActions = [
    {
      name: 'action-a',
      flags: ['--flag-a', '--flag-b']
    },
    {
      name: 'action-b',
      aliases: ['b-action']
    }
  ];
  const deps = {
    printer: { die: jest.fn() },
    supportedActions,
    processArgv: ['', '', actionName, ...flags]
  };

  return [makeGetAction(deps), deps];
};

describe('get-action', () => {
  it('should return an object with the selected action name, if it is valid', () => {
    const [getAction, deps] = createMock('action-a');
    expect(getAction()).toHaveProperty('selectedAction', 'action-a');
    expect(deps.printer.die).not.toHaveBeenCalled();
  });

  it('should die if no action is provided', () => {
    const [getAction, deps] = createMock();
    expect(getAction()).toBe(undefined);
    expect(deps.printer.die).toHaveBeenCalledTimes(1);
  });

  it('should die if an invalid action is provided', () => {
    const [getAction, deps] = createMock('invalid');
    expect(getAction()).toBe(undefined);
    expect(deps.printer.die).toHaveBeenCalledTimes(1);
  });

  it('should return an action by some of its aliases', () => {
    const [getAction] = createMock('b-action');
    expect(getAction()).toHaveProperty('selectedAction', 'action-b');
  });

  it('should return the selected flags for a given action', () => {
    const [getAction] = createMock('action-a', ['--flag-a']);
    const { activeFlags } = getAction();
    expect(activeFlags).toEqual(['--flag-a']);
  });

  it('should not return any active flags if the argv flags do not match the action configuration actions', () => {
    const [getAction] = createMock('action-a', ['--some-unknown-flag']);
    const { activeFlags } = getAction();
    expect(activeFlags).toEqual([]);
  });
});
