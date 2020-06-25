const bitcore = require("bitcore-lib-cash");
// const bech = require("bitcore-lib/lib/encoding/bech32");

let networkAlias = "kaspatest";

let kaspaNetwork = bitcore.Networks.add({
  name: "Kaspa test",
  alias: networkAlias,
  prefix: networkAlias,
  pubkeyhash: 0x6, //publickey hash prefix
  privatekey: 0xef, // privatekey prefix
  scripthash: 0xc4,
  xpubkey: 0x043587cf, // extended public key magic
  xprivkey: 0x04358394, // extended private key magic
  networkMagic: 0xdab5bffa, // network magic number
  port: 18444, // network port
  dnsSeeds: [],
});

let kaspaKeyPairs = [
  {
    privKey: "tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsxawgt",
    pubKeys: {
      main: "kaspa:pr6m7j9njldwwzlg9v7v53unlr4jkmx6ey65nvtks5",
      test: "kaspatest:pr6m7j9njldwwzlg9v7v53unlr4jkmx6eyvwc0uz5t",
      dev: "kaspadev:qr6m7j9njldwwzlg9v7v53unlr4jkmx6eylep8ekg2",
    },
  },
];

// let myKey = bitcore.PrivateKey.fromString(kaspaKeyPairs[0].privKey); // error: not base58

let myKey = bitcore.Address(kaspaKeyPairs[0].privKey);

// test("prototype: generate random HDPrivateKey, derive child, encode/decode to cashaddr format", () => {
//   let parent = new bitcore.HDPrivateKey(networkAlias);
//   // TODO: verify that deriveChild() should be used over derive()
//   let child_0_1_2h = parent.deriveChild("m/0'");
//   let address = child_0_1_2h.privateKey.toAddress();
//   let cashaddr = address.toCashAddress();
//   expect(cashaddr).toContain("kaspatest:");
//   expect(bitcore.Address(cashaddr).toString()).toEqual(address.toString());
// });
