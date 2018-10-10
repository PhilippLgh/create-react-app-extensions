const fs = require('fs')
const path = require('path')

function run({ metadata }){
  const basePath = process.cwd()
  const metadataPath = path.join(basePath, 'build', `metadata.json`)
  fs.writeFileSync(metadataPath, JSON.stringify(metadata))
  return { metadataPath }
}

module.exports = run