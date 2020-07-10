import bitcore from 'bitcore-lib-cash';
import Wallet from '../../../src/wallet/Wallet';
import mockUtxos from './mockUtxo.json';

const from = {
  address: 'kaspatest:qqy6tc7tcgpn9esl522uy6gq7ykscsrhkurdtn5xt2',
  privKey: '2835efc695e59096441595fd36f32c4fe52d09c5e02fdcb6d2effeb3448a1999',
  wallet: Wallet.fromMnemonic(
    'ceiling retreat slogan deny kick museum fruit purchase fire zoo hire poem'
  ),
};

const to = {
  address: 'kaspatest:qpp9jgyjjy7qg2s2ye4h8ge8l9t0hgksxgf9xpc6zc',
  privKey: '4f0367389d9f1b6ea361abcd44b44b9d0d5e25dbd32f6ca24bc4f040d820cc84',
  wallet: Wallet.fromMnemonic(
    'eyebrow stereo stone uniform settle moon cheese cause gain harvest radar before'
  ),
};

const utxos = mockUtxos.map((obj) => {
  return new bitcore.Transaction.UnspentOutput({
    txid: obj.transactionId,
    address: from.address,
    vout: obj.index,
    scriptPubKey: obj.scriptPubKey,
    satoshis: obj.value,
  });
});

test('a simple tx with no change', () => {
  // expected generated from kasparov CLI send.go
  let resultFromKasparov = `0100000001b13ea93d2dde9c708a823cc4418558eb2df35e050af37e23f3c8ba8c42fd5845000000006441d193b3b6c0a3963dbe9ce27ecac7e39c7cea9e134588d1af19bdb3a794adcc2edbe425f530a4bef151f4e1d309fb0a3317aee35df2ee2ed68d89519c7db592d7012103cac8d1b5d9a6f55f6bc9e5b4afcb418268753cdcb15b1c807cd4794193437f02ffffffffffffffff0100e1f505000000001976a91442592092913c042a0a266b73a327f956fba2d03288ac00000000000000000000000000000000000000000000000000000000`;
  let amount = 100000000;
  let tx = new bitcore.Transaction()
    .from(utxos[0])
    .to(to.address, amount)
    .setVersion(1)
    .fee(0)
    .sign(
      [from.wallet.currentChild.privateKey.toString()],
      bitcore.crypto.Signature.SIGHASH_ALL,
      'schnorr'
    );

  let serialized = tx.toString();
  expect(serialized).toEqual(resultFromKasparov);
});

test('a simple tx with change and fee', () => {
  let resultFromKasparov =
    '0100000001b13ea93d2dde9c708a823cc4418558eb2df35e050af37e23f3c8ba8c42fd5845000000006441b42e3af9c1207b7180d415183ffcfb0b96e2472de020e0f67997f3ac07c069630d623c5cbc9b415cf48901246ea23193dc2efa82b9a5a65bcb31600f3c6ba4bc012103cac8d1b5d9a6f55f6bc9e5b4afcb418268753cdcb15b1c807cd4794193437f02ffffffffffffffff02801d2c04000000001976a91442592092913c042a0a266b73a327f956fba2d03288ac98bfc901000000001976a91409a5e3cbc20332e61fa295c26900f12d0c4077b788ac00000000000000000000000000000000000000000000000000000000';
  let amount = 70000000;
  let tx = new bitcore.Transaction()
    .from(utxos[0])
    .to(to.address, amount)
    .setVersion(1)
    .fee(1000)
    .change(from.address)
    .sign(
      [from.wallet.currentChild.privateKey.toString()],
      bitcore.crypto.Signature.SIGHASH_ALL,
      'schnorr'
    );

  let serialized = tx.toString();
  expect(serialized).toEqual(resultFromKasparov);
});
