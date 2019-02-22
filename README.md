# Create React App Extensions

# Scripts

## > build

## >package
use `yarn package` to pack and (optionally: see below) sign the packate *without* uploading it

## > deploy
package and upload

# Publish to GitHub

in .env add
```
GH_TOKEN=1234MYGITHUBTOKEN5678
```

# Package Signing

package siging is supported through [Ethereum Signed Packages](https://github.com/PhilippLgh/ethereum-signed-packages)

in .env add:
```
ETH_KEYSTORE=0x8c2df4ac4cfa414e298ad5ee9d634e7f1a02dd1b
ETH_KEYSTORE_PW=mypassword
```
The password variable is optional and not recommended. If left out, the packaging script will ask for the password at runtime.

ETH_KEYSTORE can be a hex prefixed `address`, `filename`, or `full path` to the keystore file.

