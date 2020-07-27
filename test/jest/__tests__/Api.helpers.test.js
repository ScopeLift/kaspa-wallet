import { apiWallets } from '../data/mockWallets';
const { to, from } = apiWallets;
import * as api from '../../../src/wallet/apiHelpers';

jest.mock('src/wallet/apiHelpers', () => {
  //@ts-ignore
  const fs = require('fs').promises;
  const path = require('path');
  return {
    getBlock: jest.fn(async (blockHash) => {
      return Promise.resolve(
        JSON.parse(await fs.readFile(`test/__tests__/data/utxos/${blockHash}`, 'utf8'))
      );
    }),
    getTransactions: jest.fn((address) => fs.readFile(`../data/blocks/${address}`)),
    getUtxos: jest.fn((address) => {
      return Promise.resolve({ utxos: require('../data/utxos')[address] || [] });
    }),
    postTx: jest.fn((rawTx) => Promise.resolve(true)),
  };
});

test(`Wallet: serializes and sends a tx`, async () => {
  let utxoReq = await api.getUtxos(from.address);
  let utxos = utxoReq.utxos.filter((utxo) => utxo.isSpendable);
  from.wallet.utxoSet.add(utxos, from.address);
  let attempt = await from.wallet.sendTx({
    toAddr: to.address,
    amount: 70000000,
    fee: 1000,
  });
  expect(typeof attempt).toEqual('string');
});
