Try it...

```
npm install
npm test
```

The tests should pass.


### Open questions:

- What are the version constants for the different kaspa networks? We already know `name`, `prefix`. I believe `xpubkey` and `xprivkey` will stay the same.
```js
{
  name: "Kaspa Mainnet",
  prefix: "kaspa",
  pubkeyhash: 28, //publickey hash prefix
  privatekey: 0x80, // privatekey prefix
  scripthash: 40,
  xpubkey: 0x043587cf, // extended public key prefix
  xprivkey: 0x04358394, // extended private key prefix
  networkMagic: 0xdab5bffa, // network magic number -- not actually sure what this is used for...
  port: 18444, // network port
}
```
- Will we adjust the "purpose" level in BIP32 path according to which kaspa network is selected? (see examples of bitcoin vs bitcoin testnet https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#examples) 
- Will we adjust the "change" level in BIP32 path for utxo change?
- Are we, in phase 1 of this web wallet, deriving new receive addresses for each receipt?
- Is WIF (wallet import format) for regular keypairs only, i.e. not for hd wallets? Can we disregard if so?
- will we be doing client side account discovery? See https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#account-discovery
- to what extent will differences between bitcoin and kaspa compromise our ability to use this 3rd party library? (e.g. https://docs.kas.pa/kaspa/reference/utxo#Serialized-Format)
<!-- - hd extended keypairs are different from regular keypairs in that they have an additional random 32 bytes known as the "chain code." -->


### good resources
- bitcore-lib-cash module https://github.com/bitpay/bitcore/tree/master/packages/bitcore-lib-cash
- "documentation" for bitcore-lib-cash https://github.com/bitpay/bitcore/tree/master/packages/bitcore-lib-cash/docs
- kaspa address example python script https://github.com/kaspanet/kaspy_tools/blob/master/examples/kaspa_address_examples.py


### Eyal links
- https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
- https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
- https://medium.com/@harshagoli/hd-wallets-explained-from-high-level-to-nuts-and-bolts-9a41545f5b0
