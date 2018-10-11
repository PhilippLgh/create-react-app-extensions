const fs = require('fs')
const path = require('path')

// use create-react-apps's webpack or should it have own dependency?
const webpack = require('webpack') 

const config = require('../../../config/webpack.config.electron.dev');


function build(previousFileSizes) {
  // console.log('Creating an optimized production build...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        if (!err.message) { return reject(err); }
        let messages = [err.message]
        return reject(new Error(messages.join('\n\n')));
      }
      let resolveArgs = {}
      return resolve(resolveArgs);
    })
  })

}

async function run({ pkgJson }) {
  const basePath = process.cwd()
  const dest = path.join(basePath, 'build', `main.js`)
  const packageDir = path.join(__dirname, '..', '..', '..')
  const electronWrapper = path.join(packageDir, 'shells', 'electron', 'index.js')

  config.entry = path.join(process.cwd(), pkgJson.main)
  
  // use provided code or a simple wrapper:
  //fs.writeFileSync(dest, fs.readFileSync(electronWrapper, 'utf8'))
  await build()
  return true
}
module.exports = run