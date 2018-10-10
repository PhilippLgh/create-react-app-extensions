const fs = require('fs')
const shasum = require('../../lib/shasum')

function createChecksums(filePath){
  const data = fs.readFileSync(filePath)
  const checksums = {
    'sha1': shasum(data, 'sha1'), 
    'sha256': shasum(data, 'sha256'), 
    'sha512': shasum(data, 'sha512') 
  }
  return {
    checksums
  }
}

module.exports = createChecksums