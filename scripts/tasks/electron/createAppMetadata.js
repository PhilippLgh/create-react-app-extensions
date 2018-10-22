const fs = require('fs')
const path = require('path')
const shasum = require('../../../lib/shasum')

async function run({ pkgJson}) {

  const basePath = process.cwd()

  // used to detect changes in node_modules / dependencies which can be used for delta update optimizations
  const packageLock = await fs.readFileSync(path.join(basePath, 'yarn.lock'), 'utf8')
  const moduleHash = shasum(packageLock, 'sha256')

  const main = await fs.readFileSync(path.join(basePath, 'build', 'main.js'), 'utf8')
  const mainHash = shasum(main, 'sha256')

  let name = pkgJson.name
  let version = pkgJson.version
  let channel = 'alpha'
  const size = 0 //fs.statSync(appPath).size

  let metadata = {
    name,
    version,
    channel,
    notes: '',
    size,
    dependencies: {
      modules: moduleHash,
    },
    checksums: {
      main: mainHash,
      renderer: 'none' // TODO
    }
  }

  return {
    metadata
  }
}

module.exports = run