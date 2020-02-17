const { makeGetAction } = require('../get-action');

const createMock = (processArgv) => {
  const deps = {
    supportedActions: ['all', 'select'],
    printer: { die: jest.fn() },
    processArgv
  };

  return [makeGetAction(deps), deps];
};

describe('get-action', () => {
  it('should return the third element of process.argv if a valid action if given', () => {
    const [getAction, deps] = createMock([null, null, 'select']);
    expect(getAction()).toBe('select');
    expect(deps.printer.die).not.toHaveBeenCalled();
  });

  it('should die if an invalid action is provided', () => {
    const [getAction, deps] = createMock([null, null, 'invalid']);
    expect(getAction()).toBe(undefined);
    expect(deps.printer.die).toHaveBeenCalledTimes(1);
  });

  it('should die if no action is provided', () => {
    const [getAction, deps] = createMock([null, null]);
    expect(getAction()).toBe(undefined);
    expect(deps.printer.die).toHaveBeenCalledTimes(1);
  });
});
