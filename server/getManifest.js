const fs = require('fs');

exports.getManifest = () => {
  try {
    return JSON.parse(fs.readFileSync('dist/manifest.json'));
  } catch (e) {
    console.log(e);
  }
};
