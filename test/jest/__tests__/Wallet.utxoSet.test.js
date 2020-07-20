import { walletTestSerialize } from '../data/mockWallets';
const { to, from } = walletTestSerialize;
import mockUtxos from '../data/mockUtxo.json';

// test('Wallet UTXOs: can count', async () => {
//   from.wallet.addUtxos(mockUtxos, from.wallet.address);
//   expect(from.wallet.utxoSet.length).toEqual(5);
//   let txId = from.wallet.composeTx({
//     toAddr: to.address,
//     amount: 7e7,
//     fee: 1000,
//   });
//   expect(from.wallet.utxoSet.length).toBe(5);
//   //   from.wallet.undoTx(txId);
//   //   expect(form.wallet.utxoSet.length).toBe(6);
// });

test('UTXO set can count', () => {
  from.wallet.utxoSet.add(mockUtxos, from.wallet.address);
  expect(from.wallet.utxoSet.length).toBe(6);
  from.wallet.utxoSet.add(mockUtxos, from.wallet.address); // no dups
  expect(from.wallet.utxoSet.length).toBe(6);
  from.wallet.utxoSet.clear();
});

test('UTXO set keeps a balance', () => {
  from.wallet.utxoSet.add(mockUtxos, from.wallet.address);
  expect(from.wallet.utxoSet.balance).toEqual(600000000);
  from.wallet.utxoSet.add(mockUtxos, from.wallet.address);
  expect(from.wallet.utxoSet.balance).toEqual(600000000); // no dups
  from.wallet.utxoSet.clear();
});

test(`Wallet won't double compose UTXO`, async () => {
  from.wallet.utxoSet.add(mockUtxos, from.wallet.address);
  const utxoBalance0 = from.wallet.utxoSet.availableBalance;
  const tx1 = from.wallet.composeTx({
    toAddr: to.address,
    amount: 7e7,
    fee: 1000,
  });
  const utxoBalance1 = from.wallet.utxoSet.availableBalance;
  const tx2 = from.wallet.composeTx({
    toAddr: to.address,
    amount: 7e7,
    fee: 1000,
  });
  const utxoBalance2 = from.wallet.utxoSet.availableBalance;
  expect(tx1.utxoIds[0] === tx2.utxoIds[0]).toBe(false);
  expect(utxoBalance0 === utxoBalance1).toBe(false);
  expect(utxoBalance0 - from.wallet.utxoSet.utxos[0].satoshis).toEqual(utxoBalance1);
  expect(utxoBalance1 === utxoBalance2).toBe(false);
  expect(utxoBalance1 - from.wallet.utxoSet.utxos[1].satoshis).toEqual(utxoBalance2);
});
