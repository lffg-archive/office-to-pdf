const { join } = require('path');
const { vol, fs } = require('memfs');
const { makeReaddir } = require('../readdir');

describe('readdir', () => {
  beforeEach(() => vol.fromJSON({ './a': '1', './b': '2' }, '/test'));
  afterEach(() => vol.reset());

  it('should return a list of dirents with a path property', () => {
    const readdir = makeReaddir({ fs });
    const files = readdir('/test');

    for (const file of files) {
      expect(file).toBeInstanceOf(fs.Dirent);
      expect(file).toHaveProperty('path', join('/test', file.name));
    }
  });
});
