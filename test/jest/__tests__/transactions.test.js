import bitcore from 'bitcore-lib-cash';
import Wallet from '../../../src/wallet/Wallet';

const utxos = [
  new bitcore.Transaction.UnspentOutput({
    txid: 'a0a08e397203df68392ee95b3f08b0b3b3e2401410a38d46ae0874f74846f2e9',
    vout: 0,
    address: 'mgJT8iegL4f9NCgQFeFyfvnSw1Yj4M5Woi',
    scriptPubKey: '76a914089acaba6af8b2b4fb4bed3b747ab1e4e60b496588ac',
    amount: 0.0007,
  }),
  new bitcore.Transaction.UnspentOutput({
    txId: 'a0a08e397203df68392ee95b3f08b0b3b3e2401410a38d46ae0874f74846f2e9',
    outputIndex: 0,
    address: 'mgJT8iegL4f9NCgQFeFyfvnSw1Yj4M5Woi',
    script: '76a914089acaba6af8b2b4fb4bed3b747ab1e4e60b496588ac',
    satoshis: 70000,
  }),
];

// pk: 4f0367389d9f1b6ea361abcd44b44b9d0d5e25dbd32f6ca24bc4f040d820cc84
// address: kaspatest:qpp9jgyjjy7qg2s2ye4h8ge8l9t0hgksxgf9xpc6zc
// mnemonic: eyebrow stereo stone uniform settle moon cheese cause gain harvest radar before

// pk: 2835efc695e59096441595fd36f32c4fe52d09c5e02fdcb6d2effeb3448a1999
// address: kaspatest:qqy6tc7tcgpn9esl522uy6gq7ykscsrhkurdtn5xt2
// mnemonic: ceiling retreat slogan deny kick museum fruit purchase fire zoo hire poem

test('does tx stuff', () => {
  let wallet = new Wallet();
  let amount = 1;
  let tx = new bitcore.Transaction()
    .from(utxos)
    .to(wallet.address, amount)
    .change(wallet.address)
    .setVersion(1)
    .sign([]);

  let serialized = tx.toString();
  let obj = tx.toObject();
  console.log(serialized);
  console.log(JSON.stringify(obj));
});

test('can deserialize from kaspa docs', () => {
  //   let serialized =
  //     '0100000001360329fa59fd36071820b164645c234728f1edc2f9d462cb68a423b31f050000ffffffff00ffffffffffffffff0100f2052a010000001976a9141234e3080bbd4135ca3b330fdc42699f2997cdc088ac00000000000000000100000000000000000000000000000000000000000000000000000052cd4f97ad5f073e572a1b3e733c12294d6463a2c75dded90a5bb0bdce9a85562a1976a9141234e3080bbd4135ca3b330fdc42699f2997cdc088acbeb7ef74aa9be1222f6b61737061642f';
  //   let tx = new bitcore.Transaction();
});
