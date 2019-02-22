#!/usr/bin/env node

'use strict';

const {spawn} = require('child_process')
const path = require('path')

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'deploy'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

function handleError(err){
  console.log('Oh no, error: ' + err);
}

switch (script) {
  case 'deploy':
  case 'package':
  case 'build': {
    try{
      let child = spawn('node',
      nodeArgs
        .concat(require.resolve('../scripts/' + script))
        .concat(args.slice(scriptIndex + 1)),
      {
        stdio: 'inherit'
      })
      child.on('error', handleError);
    }catch(err){
      handleError(err)
    }
    break;
  }
  default:
    console.log('Unknown script "' + script + '".');
  break;
}
