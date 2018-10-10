const parseOptions = require('./parseOptions')
const createAPI = require('./createAPI')
const createRelease = require('./createRelease')
const uploadAsset = require('./uploadAsset')
const publishRelease = require('./publishRelease')

const createChecksums = async () => {
  return true
}

/*
    console.log('uploading metadata')
    await uploadAsset(metadataPath, 'metadata.json', draftRelease)

    await uploadAsset(asarPath, 'react_ui.asar', draftRelease)
    // TODO delete draft if uploads fail
    console.log('step 6: publishing release')
    await publishRelease(draftRelease)
*/

let githubTasks = [
   ['Get GitHub credentials', parseOptions ]
  ,['Connect to GitHub API', createAPI ]
  ,['Create release', createRelease ]
  ,['Upload metadata', async ({ github, metadataPath, draftRelease, githubOtions }) => 
  await uploadAsset(github, metadataPath, draftRelease, githubOtions) ]
  ,['Upload app', async ({ github, appPath, draftRelease, githubOtions }) => 
  await uploadAsset(github, appPath, draftRelease, githubOtions) ]
  ,['Publish release', publishRelease ]
]

module.exports = githubTasks