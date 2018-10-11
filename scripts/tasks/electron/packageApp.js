const path = require('path')
const fs = require('fs')
const asar = require('asar')

function packageApp(packageJson){
  const basePath = process.cwd()
  const src = path.join(basePath, 'build')
  // TODO test if folder contains the right file: if there is a problem with cwd 
  // we might otherwise end up packing the whole disk
  fs.readdirSync(src).forEach(file => {
    if(file.endsWith('.asar')){
      throw new Error('build dir must not contain .asar packages')
    }
  })
  const dest = path.join(basePath, 'build', `${packageJson.name}_${packageJson.version}.asar`)
  return new Promise((resolve, reject) => {
    asar.createPackage(src, dest, function() {
      resolve(dest)
    })
  })
}

module.exports = packageApp