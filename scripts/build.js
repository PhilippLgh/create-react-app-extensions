const path = require('path')
const run = require('./taskrunner')

// explicitly provide access to project's node_modules to re-use all of create-react-app's dependencies
// this is also helpful for testing as a local(file://) module where symlink file resolution might not work
process.env.NODE_PATH = path.join(process.cwd(), 'node_modules')
require('module').Module._initPaths();

const initTasks = require('./tasks/init')

const fs = require('fs')
async function copyFile(source, target) {
  var rd = fs.createReadStream(source);
  var wr = fs.createWriteStream(target);
  try {
    return await new Promise(function(resolve, reject) {
      rd.on('error', reject);
      wr.on('error', reject);
      wr.on('finish', resolve);
      rd.pipe(wr);
    });
  } catch (error) {
    rd.destroy();
    wr.end();
    throw error;
  }
}

// builds the main.js script which is executed on the main process
const buildElectron = () => {

  let tasks = initTasks.concat([
    [
      'Copy Files',
      async () => {
        const basePath = process.cwd()
        let p = path.join(basePath, 'preload', 'preload.js')
        let dest = path.join(basePath, 'build', 'preload.js')
        await copyFile(p, dest)

        let i18n = path.join(basePath, 'build', 'i18n')
        if (!fs.existsSync(i18n)) {
          fs.mkdirSync(i18n)
        }

        let eng1 = path.join(basePath, 'i18n', 'app.en.i18n.json')
        await copyFile(eng1, path.join(i18n, 'app.en.i18n.json'))

        let eng2 = path.join(basePath, 'i18n', 'mist.en.i18n.json')
        await copyFile(eng2, path.join(i18n, 'mist.en.i18n.json'))

        return true
      }
    ],
    [
    'Build Backend',
    require('./tasks/electron/buildBackend')
    ]
  ])

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