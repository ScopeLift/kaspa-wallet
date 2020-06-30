const bitcore = require('bitcore-lib-cash')

let networkPrefixes = ["kaspa", "kaspadev", "kaspareg", "kaspatest", "kaspasim"]

networkPrefixes.map(str => {
  bitcore.Networks.add({
    name: str,
    prefix: str,
    pubkeyhash: 0x00, //publickey hash prefix
    privatekey: 0x80, // privatekey prefix -- must be 128 or toWIF() result will not match with kaspa 
    scripthash: 0x05,
    xpubkey: 0x0488b21e, // extended public key magic
    xprivkey: 0x0488ade4, // extended private key magic
    networkMagic: 0xdab5bffa, // network magic number
  })
})

// bitcore.Networks.defaultNetwork = bitcore.Networks.kaspa

let keyTest = {
  pubKeyHex:
    "02f707d9ce3bd3998744cb6bd3e3da4b68a5babef5b324948681ac9250723c8fc9",
  pubKeyCashAddr: "kaspadev:qp02uemuxw2tva3fp9q5qunxxgk907r70uyxje5eg0",
  privKeyHex:
    "0a2abb86b8cc3c91ffa8efe01ec16b1efca24dd7e79538d3248f8b275e14f2f0",
  wif: "KwZUSy3xbs5eSDCgDAoTSR5KSypjU2Uy4F1QJmmKVmk2QiEoYtP1"
};

test("kaspa-provided keypair should play nicely with bitcoin-lib-cash", () => {
    let myAddress = new bitcore.Address(keyTest.pubKeyCashAddr);
    let privateKey = new bitcore.PrivateKey(keyTest.privKeyHex);
    expect(bitcore.Address.isValid(keyTest.pubKeyCashAddr)).toBe(true);
    expect(myAddress.toString()).toEqual(keyTest.pubKeyCashAddr);
    expect(bitcore.PrivateKey.isValid(keyTest.privKeyHex)).toBe(true);
    expect(privateKey.toAddress("kaspadev").toString()).toEqual(keyTest.pubKeyCashAddr);
    expect(privateKey.toWIF()).toEqual(keyTest.wif);
});

test("HD wallet should derive child addresses and encode to cashaddr with correct network prefix", () => {
  let parent = new bitcore.HDPrivateKey();
  for(let i = 0; i < 10; i++) {
    let child = parent.deriveChild(`m/44'/972/0'/0'/${i}`);
    networkPrefixes.forEach(prefix => {
      expect(bitcore.Address.isValid(child.privateKey.toAddress(prefix))).toBe(true)
      expect(child.privateKey.toAddress(prefix).toString()).toContain(prefix);
      expect(child.depth).toEqual(5);
    });
  }
})
