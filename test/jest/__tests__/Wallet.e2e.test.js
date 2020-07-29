// @ts-nocheck

import { e2eWallets } from '../data/mockWallets';
const [w1, w2] = e2eWallets;
import * as api from '../../../src/wallet/apiHelpers';
jest.mock('../../../src/wallet/apiHelpers', () => ({
  getTransactions: jest.fn(),
  getUtxos: jest.fn(),
  postTx: jest.fn((rawTx) => Promise.resolve(true)),
}));

api.getTransactions.mockImplementation((address) =>
  Promise.resolve({
    transactions:
      require(`../../../test/jest/data/comprehensive/state1`)['transactions'][address] || [],
  })
);
api.getUtxos.mockImplementation((address) => {
  return Promise.resolve({
    utxos: require(`../../../test/jest/data/comprehensive/state1`)['utxos'][address] || [],
  });
});

describe('Multiple states wallet test. Must be in describe block for serial processing', () => {
  test('Wallet: acts intelligently during state 1', async () => {
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
    expect(w1.wallet.balance).toEqual(199998000 - 100000000 - 1000);
    expect(w1.wallet.utxoSet.availableBalance).toEqual(0);
    expect(w1.wallet.utxoSet.totalBalance).toEqual(199998000);
    await w1.wallet.updateState(); // nothing different
    expect(w1.wallet.balance).toEqual(199998000 - 100000000 - 1000);
    expect(w1.wallet.utxoSet.availableBalance).toEqual(0);
    expect(w1.wallet.utxoSet.totalBalance).toEqual(199998000);
    expect(Object.keys(w1.wallet.pending.transactions).length).toBe(1);
  }, 5e6);

  test('Wallet: acts intelligently during state 2 (after tx "acknowledged")', async () => {
    api.getTransactions.mockImplementation((address) =>
      Promise.resolve({
        transactions:
          require(`../../../test/jest/data/comprehensive/state2`)['transactions'][address] || [],
      })
    );
    api.getUtxos.mockImplementation((address) => {
      return Promise.resolve({
        utxos: require(`../../../test/jest/data/comprehensive/state2`)['utxos'][address] || [],
      });
    });
    await w1.wallet.updateState();

    // some things we want to ensure, now that our tx is coming back and we have updated utxo data...
    // utxoBal / available bal / wallet bal etc
    // pending tx mgmt
    // new utxo has been added (in this case, will be the only one in our set)
    expect(
      w1.wallet.transactionsStorage['kaspatest:qrvn9pq9eujfhy6nkr5mvncdg395tlvdagc2z64n6q'].length
    ).toBe(1);
    expect(w1.wallet.utxoSet.length).toBe(1);
    expect(Object.keys(w1.wallet.pending.transactions).length).toBe(0);
    expect(w1.wallet.utxoSet.availableBalance).toBe(199998000 - 100000000 - 1000);
    expect(w1.wallet.utxoSet.totalBalance).toBe(199998000 - 100000000 - 1000);
  }, 5e6);
});
