// see https://github.com/octokit/rest.js/pull/629
async function uploadAsset (filePath, fileName, release) {
  // const contentType = mime.contentType(name) || 'application/octet-stream';
  const contentType = fileName.endsWith('.txt') ? 'text/plain' : 'application/octet-stream'
  const contentLength = _fs.statSync(filePath).size
  let githubOpts = {
    ...githubBaseOpts,
    url: release.upload_url,
    file: _fs.createReadStream(filePath),
    contentType,
    contentLength,
    name: fileName
  }
  return github.repos.uploadAsset(githubOpts)
    .catch(err => {
      console.log(`${fail} Error uploading ${filePath} to GitHub:`, err)
      process.exit(1)
    })
}