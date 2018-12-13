const path = require('path')
// use create-react-apps's webpack or should it have own dependency?
const webpack = require('webpack')
const fs = require('fs')

process.env.NODE_ENV = "production"

let config = require(path.join(process.env.NODE_MODULES_PATH, 'react-scripts', 'config', 'webpack.config.prod'))

function build(previousFileSizes) {
  /*
  console.log('Creating an optimized production build...');
  require("react-scripts/scripts/build")
  */
  const basePath = process.cwd()
  let configCustomizerPath = path.join(basePath, 'webpack.config.js')
  if(fs.existsSync(configCustomizerPath)){
    try {
      let configCustomizer = require(configCustomizerPath)
      config = configCustomizer(config)
    } catch (error) {
      console.log('faled to modify config', error)
    }
  }

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

module.exports = build
