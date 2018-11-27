const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

function packageApp(packageJson) {
  const src = path.resolve('./build');
  const dest = path.resolve(
    `./build/${packageJson.name}_${packageJson.version}.zip`
  );

  const zip = new AdmZip();

  try {
    const files = fs
      .readdirSync(src)
      .filter(e => !/\.zip$/.test(e))
      .forEach(f => {
        const filePath = path.join(src, f);
        const fileStats = fs.lstatSync(filePath);

        if (fileStats.isDirectory()) {
          zip.addLocalFolder(filePath);
        } else if (fileStats.isFile()) {
          zip.addLocalFile(filePath);
        } else {
          console.warn(
            `[WARN] packageApp.js: File ${filePath} was not added to bundle.`
          );
        }
      });
  } catch (e) {
    console.log('ERROR:', e);
  }

  zip.writeZip(dest);

  return dest;
}

module.exports = packageApp;
