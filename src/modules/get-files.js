function computekeyValueList(files) {
  return files.map((dirent) => ({ name: dirent.name, value: dirent }));
}

function makeGetFiles({ readdir, select }) {
  return async function getFiles({ allowDotFiles, showSelect, directory }) {
    const allFiles = readdir(directory).filter(
      (dirent) =>
        // Only allow files:
        dirent.isFile() &&
        // And... Forbid dotfiles, unless all dotfiles are allowed with the
        // `allowDotFiles` boolean:
        (!dirent.name.startsWith('.') || allowDotFiles)
    );

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
