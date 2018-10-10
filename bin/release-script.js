#!/usr/bin/env node

'use strict';

const {spawn} = require('child_process')
const path = require('path')

const args = process.argv.slice(2);

function handleError(err){
  console.log('Oh no, error: ' + err);
}

try{
  let child = spawn('node', [path.join(__dirname, '../scripts/index.js')], {
    stdio: 'inherit'
  })
  child.on('error', handleError);
}catch(err){
  handleError(err)
}

