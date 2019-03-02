const { pkgsign, util }  = require('@philipplgh/ethpkg')

const run = async ({ appPath }) => {
  if(!process.env.ETH_KEYSTORE) {
    console.log('\nno sign config found - skip')
    return true // dont display failed: signing not mandatory
  }
  // FIXME instead of keeping pk in temp var let pkgsign handle complete flow
  const privateKey = process.env.ETH_PRIVATE_KEY || await util.getPrivateKeyFromKeystore(process.env.ETH_KEYSTORE, process.env.ETH_KEYSTORE_PW)
  const pkg = await pkgsign.sign(appPath, privateKey)
  if(pkg) {
    const outPath = appPath // buildOutpath(appPath)
    await pkg.write(outPath)
    return outPath
  } else {
    throw new Error('package could not be signed')
  }
}

module.exports = run