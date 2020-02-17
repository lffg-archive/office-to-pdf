const { makeGetFiles } = require('../get-files');

const createMock = () => {
  const readdirReturnValue = [
    { name: 'file-a', isFile: () => true },
    { name: 'file-b', isFile: () => true },
    { name: 'dir-1', isFile: () => false }
  ];

  const deps = {
    readdir: jest.fn(() => readdirReturnValue),
    select: jest.fn((val) => val.filter(({ name }) => name.endsWith('a')))
  };

  return [makeGetFiles(deps), deps];
};

describe('get-files', () => {
  it('should call readdir passing the given directory', async () => {
    const [getFiles, deps] = createMock();
    await getFiles({ showSelect: false, directory: './path' });
    expect(deps.readdir).toHaveBeenCalledWith('./path');
  });

  it('should call select if `showSelect` is true', async () => {
    const [getFiles, deps] = createMock();
    await getFiles({ showSelect: true, directory: './path' });
    expect(deps.select).toHaveBeenCalledTimes(1);
  });

  it('should return all files if `showSelect` is false', async () => {
    const [getFiles] = createMock();
    const files = await getFiles({ showSelect: false, directory: './path' });

    expect(files.map(({ name }) => name)).toEqual(
      expect.arrayContaining(['file-a', 'file-b'])
    );
  });

  it('may filter files if `showSelect` is true', async () => {
    const [getFiles] = createMock();
    const files = await getFiles({ showSelect: true, directory: './path' });

    expect(files.map(({ name }) => name)).toEqual(
      expect.arrayContaining(['file-a'])
    );
  });
});
