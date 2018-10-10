function run({ pkgJson }){
  let parts = pkgJson.repository.url.split('/')
  let l = parts.length 
  const githubOptions = {
    owner: parts[l-2], 
    repo: parts[l-1].replace('.git', '')
  }
  return {
    githubOptions
  }
}
module.exports = run