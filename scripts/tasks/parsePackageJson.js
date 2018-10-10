const path = require('path')
const fs = require('fs')

let pkgJsonPath = path.resolve(process.cwd(), 'package.json')

function run() {
  try {
    let pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
    return pkgJson
  } catch (error) {
    // FIXME currently no handling
    throw error
  }
  return null
}

module.exports = run