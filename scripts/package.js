const path = require('path')
const run = require('./taskrunner')

// explicitly provide access to project's node_modules to re-use all of create-react-app's dependencies
// this is also helpful for testing as a local(file://) module where symlink file resolution might not work
process.env.NODE_PATH = path.join(process.cwd(), 'node_modules')
require('module').Module._initPaths();

console.log('pack script started')

const initTasks = require('./tasks/init')
const electronTasks = require('./tasks/electron')

const parseEnv = require('./tasks/parseEnv')

const runScript = require('../lib/run-script')

const buildTasks = [
  // TODO decide on release strategy based on tokens in .env
  // TODO or get pk encrypted .env from API
  ['Parse .env', parseEnv]
  // TODO make sure .env is ignored by .gitignore?
  // TODO run tests?
  ,['Build app', //pkgJson.name
  async () => {
    // TODO test that script is included in pkgJson
    // let result = await runScript('npm run build', [], process.cwd())
    let result = await runScript('yarn run build', [], process.cwd())
    return result
  }]
]

const buildOutpath = pkgPath => {
  let ext = path.extname(pkgPath)
  const basename = path.basename(pkgPath, ext)
  // ext = '.epk'
  const dirname = path.dirname(pkgPath)
  const pkgPathOut = `${dirname}/${basename}_signed${ext}`
  return pkgPathOut
}

let tasks =  [...initTasks, ...buildTasks ,...electronTasks]

//console.log('run tasks\n', tasks.map(task => task[0]).join('\n'))

run(tasks)
