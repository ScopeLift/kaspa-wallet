import bitcore from 'bitcore-lib-cash';
import Wallet from '../../../src/wallet/Wallet';
import mockUtxos from './mockUtxo.json';

// pk: 4f0367389d9f1b6ea361abcd44b44b9d0d5e25dbd32f6ca24bc4f040d820cc84
// address: kaspatest:qpp9jgyjjy7qg2s2ye4h8ge8l9t0hgksxgf9xpc6zc
// mnemonic: eyebrow stereo stone uniform settle moon cheese cause gain harvest radar before

// pk: 2835efc695e59096441595fd36f32c4fe52d09c5e02fdcb6d2effeb3448a1999
// address: kaspatest:qqy6tc7tcgpn9esl522uy6gq7ykscsrhkurdtn5xt2
// mnemonic: ceiling retreat slogan deny kick museum fruit purchase fire zoo hire poem

test('a weird test', () => {
  let addrTo = 'kaspatest:qpp9jgyjjy7qg2s2ye4h8ge8l9t0hgksxgf9xpc6zc';
  let addrFrom = 'kaspatest:qqy6tc7tcgpn9esl522uy6gq7ykscsrhkurdtn5xt2';
  let walletFrom = Wallet.fromMnemonic(
    'ceiling retreat slogan deny kick museum fruit purchase fire zoo hire poem'
  );
  let amount = 100000000;

  const utxos = mockUtxos.map((obj) => {
    return new bitcore.Transaction.UnspentOutput({
      txid: obj.transactionId,
      address: addrFrom,
      vout: obj.index,
      scriptPubKey: obj.scriptPubKey,
      satoshis: obj.value,
    });
  });

  let tx = new bitcore.Transaction()
    .from(utxos[0])
    .to(addrTo, amount)
    // .change(walletFrom.address)
    .setVersion(1)
    .fee(0)
    .sign(
      [walletFrom.currentChild.privateKey.toString()],
      bitcore.crypto.Signature.SIGHASH_ALL,
      'schnorr'
    );

  let serialized = tx.toString();
  let objj = tx.toObject();
  let inspect = tx.inspect();
  console.log(serialized);
  console.log(JSON.stringify(objj));
});
