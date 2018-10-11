const path = require('path')
const run = require('./taskrunner')

// explicitly provide access to project's node_modules to re-use all of create-react-app's dependencies
// this is also helpful for testing as a local(file://) module where symlink file resolution might not work
process.env.NODE_PATH = path.join(process.cwd(), 'node_modules')
require('module').Module._initPaths();

const initTasks = require('./tasks/init')

// builds the main.js script which is executed on the main process
const buildElectron = () => {

  let tasks = initTasks.concat([[
    'Build Backend',
    require('./tasks/electron/buildBackend')
  ]])

  run(tasks)

} 


const argv = process.argv.slice(2);
if(argv.indexOf('app') !== -1){
  console.log('build for electron')
  buildElectron()
  return
} 
if(argv.indexOf('electron') !== -1){
  console.log('build for electron')
  buildElectron()
  return
} 
else {
  // run([])
  console.log('build target arg missing')
  return
}