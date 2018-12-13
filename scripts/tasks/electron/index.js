const buildBackend = require('./buildBackend')
const packageApp = require('./packageApp')
const createChecksums = require('../createChecksums')
const createAppMetadata = require('./createAppMetadata')
const createPackageMetadata = require('./createPackageMetadata')
const writeMetadata = require('./writeMetadata')

const fs = require('fs')

let electronTasks = [
  [
    'Copy Static Files',
    () => true
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