const packageApp = require('./packageApp')
const createChecksums = require('../createChecksums')
const createMetadata = require('./createMetadata')
const writeMetadata = require('./writeMetadata')


let electronTasks = [
  // TODO add background script
  ['Package app', 
  async ({ pkgJson }) => {
    let appPath = await packageApp(pkgJson)
    return {appPath}
  }]
  // TODO compress 
  // TODO optimize module imports
  // TODO sign (ledger, trezor)
  ,['Generate app checksums', async ({ appPath }) => await createChecksums(appPath) ]
  ,['Generate metadata', createMetadata ]
  ,['Write metadata', writeMetadata ]
]

module.exports = electronTasks