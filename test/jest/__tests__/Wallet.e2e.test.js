// @ts-nocheck

import { e2eWallets } from '../data/mockWallets';
const [w1, w2] = e2eWallets;
import * as api from '../../../src/wallet/apiHelpers';

let state = 'state1';

jest.mock('../../../src/wallet/apiHelpers', () => {
  return {
    getBlock: jest.fn((blockHash) => Promise.resolve(undefined)),
    getTransactions: jest.fn((address) =>
      Promise.resolve({
        transactions:
          require(`../../../test/jest/data/comprehensive/${state}`)['transactions'][address] || [],
      })
    ),
    getUtxos: jest.fn((address) => {
      return Promise.resolve({
        utxos: require(`../../../test/jest/data/comprehensive/${state}`)['utxos'][address] || [],
      });
    }),
    postTx: jest.fn((rawTx) => Promise.resolve(true)),
  };
});

test('Wallet: acts intelligently', async () => {
  await w1.wallet.addressDiscovery();
  expect(w1.wallet.transactions.length > 0).toBe(true);
  expect(api.getTransactions.mock.calls.length >= 40).toBe(true);
  expect(Object.keys(w1.wallet.transactionsStorage).length).toBe(api.getUtxos.mock.calls.length);
  expect(w1.wallet.utxoSet.availableBalance).toBe(199998000);
  expect(w1.wallet.addressManager.shouldFetch.length).toBe(
    Object.keys(w1.wallet.transactionsStorage).length + 2 // fetch for all previously active receive addresses + 1 and all previously active change addresses + 1
  );
  console.log(w1.wallet.addressManager.shouldFetch);
  const txId = await w1.wallet.sendTx({
    toAddr: w2.address,
    amount: 100000000,
  });
  console.log(w1.wallet.addressManager.shouldFetch);
  expect(Object.keys(w1.wallet.pending.transactions).length).toBe(1);
  //   expect(w1.wallet.addressManager.shouldFetch.length).toBe(
  //     Object.keys(w1.wallet.transactionsStorage).length + 3
  //   );
  let throws = async () =>
    // we already used our UTXO!
    await w1.wallet.sendTx({
      toAddr: w2.address,
      amount: 12345678,
    });
  await expect(throws()).rejects.toThrowError('Transaction compose error');
  await w1.wallet.updateState();
}, 5e6);
