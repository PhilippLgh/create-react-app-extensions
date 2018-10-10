let ts = Math.floor(new Date().getTime() / 1000)
let response = await github.repos.createRelease({
  ...githubBaseOpts,
  tag_name: `v${packageJson.version}${channel ? '-' : ''}${channel}_${ts}`,
  draft: true
})
let draftRelease = response.data