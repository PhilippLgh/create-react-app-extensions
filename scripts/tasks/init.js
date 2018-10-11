const parsePgkJson = require('./parsePackageJson')

let initTasks = [
  ['Parse package.json',
  async () => {
    let pkgJson = parsePgkJson()
    return { pkgJson }
  }]
  // TODO required attributes: name, version, 
  // repository.url as .git url, main as electron entry point
  ,['Validate package.json', async () => true]
]

module.exports = initTasks