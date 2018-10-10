const crypto = require('crypto')

function shasum(data, alg){
  return crypto.createHash(alg || 'sha256').update(data).digest('hex')
}

module.exports = shasum