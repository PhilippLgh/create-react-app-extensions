const path = require('path')
// use create-react-apps's webpack or should it have own dependency?
const webpack = require('webpack')

process.env.NODE_ENV = "production"

const config = require(path.join(process.env.NODE_MODULES_PATH, 'react-scripts', 'config', 'webpack.config.prod'))

function build(previousFileSizes) {
  /*
  console.log('Creating an optimized production build...');
  require("react-scripts/scripts/build")
  */

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
