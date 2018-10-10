const parseOptions = require('./parseOptions')
const createAPI = require('./createAPI')
const createRelease = require('./createRelease')
const uploadAsset = require('./uploadAsset')
const publishRelease = require('./publishRelease')

let githubTasks = [
   ['Get GitHub credentials', parseOptions ]
  ,['Connect to GitHub API', createAPI ]
  ,['Create release', createRelease ]
  ,['Upload metadata', async ({ github, metadataPath, draftRelease, githubOtions }) => 
  await uploadAsset(github, metadataPath, draftRelease, githubOtions) ]
  ,['Upload app', async ({ github, appPath, draftRelease, githubOtions }) => 
  await uploadAsset(github, appPath, draftRelease, githubOtions) ]
  ,['Publish release', publishRelease ]
  // TODO delete draft if uploads fail
]

module.exports = githubTasks