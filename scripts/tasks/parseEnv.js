const path = require('path')
const dotenv = require('dotenv')

function run() {
  dotenv.config({
    path: path.resolve(process.cwd(), '.env')
  })
  const token = process.env.GITHUB_TOKEN
  if(!token){
    // FIXME separate deploy bundling from actual upload
    return true
    // throw new Error('No GitHub token found in environment: check .env file for GITHUB_TOKEN entry')
  } else {
    return true
  }
}

module.exports = run