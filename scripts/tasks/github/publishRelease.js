async function publishRelease({ github, draftRelease, githubOptions }){
  let release = draftRelease
  let githubOpts = {
    ...githubOptions,
    release_id: release.id,
    tag_name: release.tag_name,
    draft: false
  }
  await github.repos.editRelease(githubOpts)
  /*
    .catch(err => {
      console.log(`Error publishing release:`, err)
      process.exit(1)
    })
    */
  return true
}
module.exports = publishRelease