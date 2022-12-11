const fs = require('fs-extra');

const bumpVersion = () => {
  const raw_package_json = fs.readFileSync('./package.json');
  const package_json = JSON.parse(raw_package_json);
  let version = package_json.version;

  try {
    const version_split = version.split('.');
    let [major, minor, patch] = version_split;
    patch = Number(patch) + 1;
    const new_version = [major, minor, patch].join('.');
    version = new_version;
  } catch (e) {
    console.log(e);
    console.log(`Error >> Using local version number: ${version}`);
  }

  console.log(`Setting new version as: ${version}`);
  package_json.version = version;
  fs.writeFileSync('./package.json', JSON.stringify(package_json, null, 2) + "\n");
  return version;
}

const version = bumpVersion();

const folders = [
  {
    path: './build/static/js',
    regex: /^(main).[\w]*.js$/,
    outputFile: `./dist/latest/${version}.js`
  }
];

fs.emptyDirSync('./dist/latest');

folders.forEach(folder => {
  fs.readdirSync(folder.path).forEach(file => {
    if (folder.regex.test(file)) {
      console.log(`copying file ${file}`);
      fs.copy(`${folder.path}/${file}`, folder.outputFile)
        .then(() => console.log('success!'))
        .catch(err => console.error(err));
    }
  });
});
