const fs = require('fs')
const path = require('path')

// see https://github.com/octokit/rest.js/pull/629
async function uploadAsset (github, filePath, release, githubOptions) {
  const fileName = path.basename(filePath)
  // const contentType = mime.contentType(name) || 'application/octet-stream';
  const contentType = fileName.endsWith('.txt') ? 'text/plain' : 'application/octet-stream'
  const contentLength = fs.statSync(filePath).size
  let githubOpts = {
    ...githubOptions,
    url: release.upload_url,
    file: fs.createReadStream(filePath),
    name: fileName,
    headers: {
      'content-type': contentType,
      'content-length': contentLength
    }
  }
  await github.repos.uploadReleaseAsset(githubOpts)
  /*
  .catch(err => {
    console.log(`Error uploading ${filePath} to GitHub:`, err)
    process.exit(1)
  })
  */
   return true
}

module.exports = uploadAsset