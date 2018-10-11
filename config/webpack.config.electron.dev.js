var path = require('path');

module.exports = {
  entry: 'main.js',
  target: 'electron-main',
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: 'main.js'
  },
  node: {
    __dirname: false
  }
}