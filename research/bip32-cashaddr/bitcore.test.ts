const bitcore = require("bitcore-lib-cash");

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

test("generates a random HDPrivateKey and can encode in and out of cashaddr format", () => {
  let parent = new bitcore.HDPrivateKey(networkAlias);
  // TODO: verify that deriveChild() should be used over derive()
  let child_0_1_2h = parent.deriveChild("m/0'");
  let address = child_0_1_2h.privateKey.toAddress();
  let cashaddr = address.toCashAddress();
  expect(cashaddr).toContain("kaspatest:");
  expect(bitcore.Address(cashaddr).toString()).toEqual(address.toString());
});
