    // parse channel info from args or use username as default channel
    const channel = _channel || (process.argv.length > 2 ? process.argv[2] : username).toLowerCase()
    console.log('publish to channel:', channel)
    const packageJson = JSON.parse(_fs.readFileSync(path.join(basePath, 'package.json'), 'utf8'))
    let version = packageJson.version
    
    console.log('previous version', version)
    let writeChanges = false // || true // as default
    if (semver.valid(version)) {
      if (channel === 'alpha') {
        version = semver.inc(version, 'patch')
      }      
      else if (channel === 'beta') {
        version = semver.inc(version, 'minor')
      }
      else if (channel === 'release') {
        version = semver.inc(version, 'major')
      }
      else {
        writeChanges = false
        version = semver.inc(version, 'prerelease', channel)
      }
      console.log('release version', version)
    }


    
    if (writeChanges) {
      console.log('overwriting package.json version')
      await fs.writeFile(path.join(basePath, 'package.json'), JSON.stringify({
        ...packageJson,
        version
      }, null, 2))
    }