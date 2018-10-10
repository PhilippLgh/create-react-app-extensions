const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runScript (scriptName, scriptArgs, cwd) {
  let scriptCommand = `${scriptName} ${scriptArgs.join(' ')}`
  let scriptOptions = {
    encoding: 'UTF-8'
  }
  if (cwd) {
    scriptOptions.cwd = cwd
  }
  try {
    await exec(scriptCommand, scriptOptions)
    return true
  } catch (err) {
    console.log(`Error running ${scriptName}`, err)
    return false
  }
}

module.exports = runScript