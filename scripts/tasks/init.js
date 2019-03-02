const parsePgkJson = require('./parsePackageJson')

const VALID_CHANNELS = [
  'alpha',
  'beta',
  'dev',
  'production',
  'release',
  'master',
  'ci',
  'nightly',
]

let initTasks = [
  ['Parse package.json',
  async () => {
    let pkgJson = parsePgkJson()

    let channel = process.argv.pop()
    if(!VALID_CHANNELS.includes(channel)) {
      console.log(`invalid channel ${channel} - default to "alpha"`)
      channel = 'alpha'
    }

    return { pkgJson, channel }
  }]
  // TODO required attributes: name, version, 
  // repository.url as .git url, main as electron entry point
  ,['Validate package.json', async () => true]
]

module.exports = initTasks