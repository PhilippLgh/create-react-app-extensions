const fs = require('fs')
const path = require('path')
const shasum = require('../../../lib/shasum')

async function run({ pkgJson, channel, checksums, appPath }) {

  const basePath = process.cwd()

  // used to detect changes in node_modules / dependencies which can be used for delta update optimizations
  const packageLock = await fs.readFileSync(path.join(basePath, 'yarn.lock'), 'utf8')
  const moduleHash = shasum(packageLock, 'sha256')

  let name = pkgJson.name
  let version = pkgJson.version
  let icon = ""
  const size = fs.statSync(appPath).size

  let metadata = {
    name,
    version,
    channel,
    icon,
    notes: '',
    size,
    dependencies: {
      // TODO backend script dependency
      modules: moduleHash
    },
    ...checksums
  }

  return {
    metadata
  }
}

module.exports = run