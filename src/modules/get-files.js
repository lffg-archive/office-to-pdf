function computekeyValueList(files) {
  return files.map((dirent) => ({ name: dirent.name, value: dirent }));
}

function makeGetFiles({ readdir, select }) {
  return async function getFiles({ showSelect, directory }) {
    const allFiles = readdir(directory).filter((dirent) => dirent.isFile());

    const selectedFiles = showSelect
      ? await select(
          computekeyValueList(allFiles),
          'Select the files you want to convert.'
        )
      : allFiles;

    return selectedFiles;
  };
}

module.exports = {
  makeGetFiles
};
