const path = require('path')
const asar = require('asar')

function packageApp(packageJson){
  const basePath = process.cwd()
  const src = path.join(basePath, 'build')
  const dest = path.join(basePath, 'build', `${packageJson.name}_${packageJson.version}.asar`)
  return new Promise((resolve, reject) => {
    asar.createPackage(src, dest, function() {
      resolve(dest)
    })
  })
}

module.exports = packageApp