const GitHub = require('@octokit/rest')

function run(){
  const github = new GitHub()
  github.authenticate({type: 'token', token: process.env.GITHUB_TOKEN})
  return {
    github
  }
}

module.exports = run