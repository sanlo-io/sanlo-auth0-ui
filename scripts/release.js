const fs = require('fs-extra');

// Currently operating under the assumption there is really
// only ever going to be one "latest" file at a time, since that
// build process clears out the latest folder.

fs.readdirSync('./dist/latest').forEach(file => {
  console.log(`copying file ${file}`);
  fs.copy(`./dist/latest/${file}`, `./dist/releases/${file}`)
    .then(() => console.log('success!'))
    .catch(err => console.error(err));
});
