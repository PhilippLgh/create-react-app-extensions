const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const log = console.log;

const parsePgkJson = require('./tasks/parsePackageJson')
const parseEnv = require('./tasks/parseEnv')

const githubTasks = require('./tasks/github')
const electronTasks = require('./tasks/electron')

const runScript = require('../lib/run-script')

const spinner = ora({spinner: {
  "interval": 100,
  "frames": [
    "▓",
    "▒",
    "░"
  ]
}})

const startTask = name => {
  spinner.start()
  spinner.text = chalk.white.bgBlack.bold(' ' + name + '  ')
  spinner.t_org = name
}

const succeed = () => {
  let t = chalk.green.bold(spinner.t_org)
  spinner.succeed(t)
}

const failed = (msg) => {
  t = chalk.white.bgRed.bold(spinner.t_org +  ' FAILED: ' + (msg || ''))
  spinner.fail(t)
  process.exit()
}

async function sleep(t){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve()
    }, t)
  });
}

let tasks = [
  ['Parse package.json',
  async () => {
    let pkgJson = parsePgkJson()
    await sleep(2 * 1000)
    return { pkgJson }
  }]
  // TODO required attributes: name, version, repository.url as .git url
  ,['Validate package.json', async () => true]
  // TODO decide on release strategy based on tokens in .env
  // TODO or get pk encrypted .env from API
  ,['Parse .env', parseEnv]
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
// TODO generate lander?

tasks = [...tasks, ...electronTasks, ...githubTasks]

// start: async wrapper
const run = async () => {
  // TASK RUNNER
  let env = {}
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    let name = task[0]
    if(typeof name === 'function'){
      name = name(env)
    }
    let fn = task[1] || Promise.resolve()
    startTask(name)
    try {
      let result = await fn(env)
      if(result){ succeed() }
      else { failed() }
      env = {
        ...env,
        ...result
      }
    } catch (error) {
      failed(error.message)
    }
  }

};run()
// end: async wrapper