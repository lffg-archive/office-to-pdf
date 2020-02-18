const { makeGetFiles } = require('../get-files');

const createMock = () => {
  const readdirReturnValue = [
    { name: 'file-a', isFile: () => true },
    { name: 'file-b', isFile: () => true },
    { name: '.dot-f', isFile: () => true },
    { name: 'dir-1', isFile: () => false }
  ];

  const deps = {
    readdir: jest.fn(() => readdirReturnValue),
    select: jest.fn()
  };

  return [makeGetFiles(deps), deps];
};

describe('get-files', () => {
  it('should return the valid files', async () => {
    const [getFiles] = createMock();

    const files = await getFiles({
      allowDotFiles: false,
      showSelect: false,
      directory: './path'
    });

    expect(files.map(({ name }) => name)).toEqual(['file-a', 'file-b']);
  });

  it('should return the valid files AND the dotfiles if `allowDotFiles` option is true', async () => {
    const [getFiles] = createMock();

    const files = await getFiles({
      allowDotFiles: true,
      showSelect: false,
      directory: './path'
    });

    expect(files.map(({ name }) => name)).toEqual([
      'file-a',
      'file-b',
      '.dot-f'
    ]);
  });

  it('should call select if `showSelect` is true', async () => {
    const [getFiles, deps] = createMock();

    await getFiles({
      allowDotFiles: false,
      showSelect: true,
      directory: './path'
    });

    expect(deps.select).toHaveBeenCalledTimes(1);
  });

  it('should NOT call `select` if `showSelect` is false', async () => {
    const [getFiles, deps] = createMock();

    await getFiles({
      allowDotFiles: false,
      showSelect: false,
      directory: './path'
    });

    expect(deps.select).toHaveBeenCalledTimes(0);
  });
});
