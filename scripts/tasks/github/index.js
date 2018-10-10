const createChecksums = async () => {
  return true
}

let githubTasks = [
   ['Connect to GitHub API', async ({ appPath }) => await createChecksums(appPath) ]
  ,['Create release', async ({ appPath }) => await createChecksums(appPath) ]
  ,['Upload metadata', async ({ appPath }) => await createChecksums(appPath) ]
  ,['Upload app', async ({ appPath }) => await createChecksums(appPath) ]
  ,['Publish release', async ({ appPath }) => await createChecksums(appPath) ]
]

module.exports = githubTasks