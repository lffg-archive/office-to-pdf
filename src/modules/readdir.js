const { join } = require('path');

function makeReaddir({ fs }) {
  return function readdir(pathname) {
    return fs.readdirSync(pathname, { withFileTypes: true }).map((dirent) =>
      Object.assign(dirent, {
        path: join(pathname, dirent.name)
      })
    );
  };
}

module.exports = {
  makeReaddir
};
