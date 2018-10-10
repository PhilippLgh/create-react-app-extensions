const path = require('path')
const dotenv = require('dotenv')

function run() {
  dotenv.config({
    path: path.resolve(process.cwd(), '.env')
  })
  //return process.env.GITHUB_TOKEN
  //throw new Error('No GitHub token found in environment: check .env file for GITHUB_TOKEN entry')
  return '12345'
}

module.exports = run