const GitHub = require('@octokit/rest')

function run(){
  const github = new GitHub({
    auth: process.env.GH_TOKEN
  })
  return {
    github
  }
}

module.exports = run