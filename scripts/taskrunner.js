const chalk = require('chalk')
const ora = require('ora')

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

const run = async (tasks) => {
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

};

module.exports = run