const path = require('path')
const run = require('./taskrunner')

// explicitly provide access to project's node_modules to re-use all of create-react-app's dependencies
// this is also helpful for testing as a local(file://) module where symlink file resolution might not work
process.env.NODE_PATH = path.join(process.cwd(), 'node_modules')
process.env.NODE_MODULES_PATH = path.join(process.cwd(), 'node_modules')
require('module').Module._initPaths();

const initTasks = require('./tasks/init')
const buildAppTasks = require('./tasks/cra')

const basePath = process.cwd()

// build the app: this is a customizable alternative for cra's `build` 
const buildApp = () => {
  let tasks = buildAppTasks
  run(tasks)
}

// builds the main.js script which is executed on the main process
const buildElectron = () => {
  let tasks = initTasks.concat([
    ['Build Electron Backend', require('./tasks/electron/buildBackend')]
  ])
  run(tasks)
} 

const argv = process.argv.slice(2);
if(argv.indexOf('app') !== -1){
  buildApp()
  return
} 
if(argv.indexOf('electron') !== -1){
  buildElectron()
  return
} 
else {
  // run([])
  console.log('build target arg missing')
  return
}
