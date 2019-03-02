
async function run({ pkgJson, channel, github, githubOptions }){

  let version = pkgJson.version
  let ts = Math.floor(new Date().getTime() / 1000)

  let response = await github.repos.createRelease({
    ...githubOptions,
    tag_name: `v${version}${channel ? '-' : ''}${channel}_${ts}`,
    draft: true
  })

  let draftRelease = response.data
  return {
    draftRelease
  }
}
module.exports = run