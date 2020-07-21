import { walletTestSerialize } from '../data/mockWallets';
const { to, from } = walletTestSerialize;
import mockUtxos from '../data/mockUtxo.json';

test('UTXO set can count', () => {
  from.wallet.utxoSet.add(mockUtxos, from.address);
  expect(from.wallet.utxoSet.length).toBe(6);
  from.wallet.utxoSet.add(mockUtxos, from.address); // no dups
  expect(from.wallet.utxoSet.length).toBe(6);
  from.wallet.utxoSet.clear();
});

test('UTXO set keeps a balance', () => {
  from.wallet.utxoSet.add(mockUtxos, from.address);
  from.wallet.updateBalance();
  const utxoBalance0 = from.wallet.utxoSet.availableBalance;
  const balance0 = from.wallet.balance;
  expect(utxoBalance0).toEqual(600000000);
  expect(balance0).toEqual(6e8);
  from.wallet.utxoSet.add(mockUtxos, from.address);
  from.wallet.updateBalance();
  expect(from.wallet.utxoSet.availableBalance).toEqual(600000000); // no dups
  expect(balance0).toEqual(6e8); // no dups
  const tx1 = from.wallet.composeTx({
    toAddr: to.address,
    amount: 7e7,
    fee: 1000,
  });
  const utxoBalance1 = from.wallet.utxoSet.availableBalance;
  const balance1 = from.wallet.balance;
  expect(balance1).toEqual(balance0 - 7e7 - 1000);
  expect(utxoBalance1).toEqual(utxoBalance0 - 1e8);
  from.wallet.deleteTx(tx1.id);
  from.wallet.utxoSet.clear();
});

test(`Wallet won't double compose UTXO`, async () => {
  from.wallet.utxoSet.add(mockUtxos, from.address);
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
  expect(utxoBalance0 - from.wallet.utxoSet.utxos[tx1.utxoIds[0]].satoshis).toEqual(utxoBalance1);
  expect(utxoBalance1 === utxoBalance2).toBe(false);
  expect(utxoBalance1 - from.wallet.utxoSet.utxos[tx2.utxoIds[0]].satoshis).toEqual(utxoBalance2);
  from.wallet.deleteTx(tx1.id);
  from.wallet.deleteTx(tx2.id);
  from.wallet.utxoSet.clear();
});

test(`Utxo set can account for aborted transactions`, () => {
  from.wallet.utxoSet.add(mockUtxos, from.address);
  from.wallet.updateBalance();
  const utxoBalance0 = from.wallet.utxoSet.availableBalance;
  const balance0 = from.wallet.balance;
  expect(utxoBalance0).toEqual(balance0);
  const tx1 = from.wallet.composeTx({
    toAddr: to.address,
    amount: 7e7,
    fee: 1000,
  });
  const utxoBalance1 = from.wallet.utxoSet.availableBalance;
  const balance1 = from.wallet.balance;
  expect(balance1).toEqual(balance0 - 7e7 - 1000);
  expect(utxoBalance0 === utxoBalance1).toBe(false);
  expect(from.wallet.utxoSet.inUse.length).toBe(1);
  from.wallet.deleteTx(tx1.id);
  expect(from.wallet.utxoSet.availableBalance).toEqual(utxoBalance0);
  expect(from.wallet.utxoSet.inUse.length).toBe(0);
});
