const fs = require('fs')
const path = require('path')

function run() {
  const basePath = process.cwd()
  const dest = path.join(basePath, 'build', `main.js`)
  const packageDir = path.join(__dirname, '..', '..', '..')
  const electronWrapper = path.join(packageDir, 'shells', 'electron', 'index.js')
  
  fs.writeFileSync(dest, fs.readFileSync(electronWrapper, 'utf8'))
  return true
}
module.exports = run