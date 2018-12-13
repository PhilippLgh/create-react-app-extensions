const fs = require('fs-extra')
const path = require('path')

const basePath = process.cwd()

const paths = {
  appBuild : path.join(basePath, 'build'),
  appPublic: path.join(basePath, 'public'),
  appHtml: '' 
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
  return true
}

module.exports = copyPublicFolder
