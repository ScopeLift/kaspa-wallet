// @ts-nocheck
/* eslint-disable */

module.exports = {
  getBlock: jest.fn((blockHash) => Promise.resolve(undefined)),
  getTransactions: jest.fn((address) =>
    Promise.resolve({
      transactions: require('../../../test/jest/data/transactions')[address] || [],
    })
  ),
  getUtxos: jest.fn((address) => {
    console.log(address);
    return Promise.resolve({ utxos: require('../../../test/jest/data/utxos')[address] || [] });
  }),
  postTx: jest.fn((rawTx) => Promise.resolve(true)),
};
