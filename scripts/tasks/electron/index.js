const buildBackend = require('./buildBackend')
const packageApp = require('./packageApp')
const createChecksums = require('../createChecksums')
const createAppMetadata = require('./createAppMetadata')
const createPackageMetadata = require('./createPackageMetadata')
const writeMetadata = require('./writeMetadata')

const fs = require('fs')
const path = require('path')
async function copyFile(source, target) {
  var rd = fs.createReadStream(source);
  var wr = fs.createWriteStream(target);
  try {
    return await new Promise(function(resolve, reject) {
      rd.on('error', reject);
      wr.on('error', reject);
      wr.on('finish', resolve);
      rd.pipe(wr);
    });
  } catch (error) {
    rd.destroy();
    wr.end();
    throw error;
  }
}

let electronTasks = [
  [
    'Copy Files',
    async () => {
      const basePath = process.cwd()
      let p = path.join(basePath, 'preload', 'preload.js')
      let dest = path.join(basePath, 'build', 'preload.js')
      await copyFile(p, dest)

      let i18n = path.join(basePath, 'build', 'i18n')
      if (!fs.existsSync(i18n)) {
        fs.mkdirSync(i18n)
      }

      let eng1 = path.join(basePath, 'i18n', 'app.en.i18n.json')
      await copyFile(eng1, path.join(i18n, 'app.en.i18n.json'))

      let eng2 = path.join(basePath, 'i18n', 'mist.en.i18n.json')
      await copyFile(eng2, path.join(i18n, 'mist.en.i18n.json'))

      return true
    }
  ]
  ,['Build backend', buildBackend ]
  ,['Generate app metadata', createAppMetadata]
  ,['Write metadata', writeMetadata ]
  ,['Package app', 
  async ({ pkgJson }) => {
    let appPath = await packageApp(pkgJson)
    return {appPath}
  }]
  // TODO compress 
  // see https://github.com/facebook/create-react-app/issues/1908
  // TODO optimize module imports
  // TODO sign (ledger, trezor)
  ,['Generate app checksums', async ({ appPath }) => await createChecksums(appPath) ]
  ,['Generate package metadata', createPackageMetadata ]
  ,['Write metadata', writeMetadata ]
]

module.exports = electronTasks