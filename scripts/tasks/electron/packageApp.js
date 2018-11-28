const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

const excludeZipFiles = e => !/\.zip$/.test(e);

const addFile = (src, file, zip) => {
  const filePath = path.join(src, file);

  const fileStats = fs.lstatSync(filePath);
  if (fileStats.isDirectory()) {
    console.log('Adding folder:', filePath, file);
    zip.addLocalFolder(filePath, file);
  } else if (fileStats.isFile()) {
    console.log('Adding file:', filePath);
    zip.addLocalFile(filePath);
  } else {
    console.warn(
      `[WARN] packageApp.js: File ${filePath} was not added to bundle.`
    );
  }
};

function packageApp(packageJson) {
  const src = path.resolve('./build');
  const dest = path.resolve(
    `./build/${packageJson.name}_${packageJson.version}.zip`
  );

  const zip = new AdmZip();

  try {
    const files = fs
      .readdirSync(src)
      .filter(excludeZipFiles)
      .forEach(f => {
        addFile(src, f, zip);
      });
  } catch (e) {
    console.log('[ERROR] packageApp:', e);
  }

  zip.writeZip(dest);

  return dest;
}

module.exports = packageApp;
