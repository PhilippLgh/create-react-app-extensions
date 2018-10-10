
async function run({ github, pkgJson, githubOptions }){

  let version = pkgJson.version
  let channel = 'alpha'
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