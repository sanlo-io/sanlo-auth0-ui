const fs = require('fs-extra');

const args = process.argv.slice(2) || [];
const auth0env = args[0];

const folders = [
  {
    path: './build/static/js',
    regex: /^(main).[\w]*.js$/,
    outputFile: `./dist/${auth0env}.js`
  }
];

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


// const fs = require('fs');
// const axios = require('axios');

// const args = process.argv.slice(2) || [];
// const is_prod = args[0] === 'prod';

// const bumpVersion = async () => {
//   const raw_package_json = fs.readFileSync('./package.json');
//   const package_json = JSON.parse(raw_package_json);

//   const prefix = is_prod ? "@sanlo" : "@sanlo-dev";
//   package_json.name = `${prefix}/react-sdk`;

//   let version = package_json.version;
//   try {
//     // Try to fetch the published version and base off that
//     const URL = "https://registry.npmjs.org/" + package_json.name;
//     const response = await axios.get(URL);
//     const published_version_info = response.data;
//     const published_version = published_version_info['dist-tags'].latest;
//     version = published_version;
//     console.log(`Success >> Published version found: ${version}`);
//     const version_split = version.split('.');
//     let [major, minor, patch] = version_split;
//     // TO-DO:
//     // Update one of the specific numbers based on input parameters
//     // For now just bump patch
//     patch = Number(patch) + 1;
//     package_json.version = [major, minor, patch].join('.');
//   } catch (e) {
//     console.log(e);
//     // Otherwise use the local version
//     console.log(`Error >> Using local version number: ${version}`);
//   }

//   console.log(`Current package name: ${package_json.name}`);
//   console.log(`Setting new version as: ${package_json.version}`);

//   fs.writeFileSync('./package.json', JSON.stringify(package_json, null, 2) + "\n");
// }

// bumpVersion();
