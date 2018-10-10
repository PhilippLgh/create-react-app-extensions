async function publishRelease (release) {
  let githubOpts = {
    ...githubBaseOpts,
    release_id: release.id,
    tag_name: release.tag_name,
    draft: false
  }
  return github.repos.editRelease(githubOpts)
    .catch(err => {
      console.log(`${fail} Error publishing release:`, err)
      process.exit(1)
    })
}
