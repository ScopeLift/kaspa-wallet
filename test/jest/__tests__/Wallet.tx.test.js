import mockUtxos from '../data/mockUtxo.json';
import { walletTestSerialize, apiWallets } from '../data/mockWallets';
const { to, from } = apiWallets;
const { to: serializeTo, from: serializeFrom } = walletTestSerialize;

import * as api from '../../../src/wallet/apiHelpers';

jest.mock('../../../src/wallet/apiHelpers');

test(`Wallet: serializes a transaction correctly given inputs`, async () => {
  let expected =
    '0100000001b13ea93d2dde9c708a823cc4418558eb2df35e050af37e23f3c8ba8c42fd5845000000006441b42e3af9c1207b7180d415183ffcfb0b96e2472de020e0f67997f3ac07c069630d623c5cbc9b415cf48901246ea23193dc2efa82b9a5a65bcb31600f3c6ba4bc012103cac8d1b5d9a6f55f6bc9e5b4afcb418268753cdcb15b1c807cd4794193437f02ffffffffffffffff02801d2c04000000001976a91442592092913c042a0a266b73a327f956fba2d03288ac98bfc901000000001976a91409a5e3cbc20332e61fa295c26900f12d0c4077b788ac00000000000000000000000000000000000000000000000000000000';
  serializeFrom.wallet.utxoSet.add(mockUtxos, serializeFrom.address);
  let tx = serializeFrom.wallet.composeTx({
    toAddr: serializeTo.address,
    amount: 70000000,
    fee: 1000,
    changeAddrOverride: serializeFrom.address,
  });
  expect(tx.rawTx).toEqual(expected);
  serializeFrom.wallet.utxoSet.clear();
});

test(`Wallet: will not let me use the same UTXO`, async () => {
  await from.wallet.addressDiscovery();
  const tx1id = await from.wallet.sendTx({
    toAddr: to.address,
    amount: 70000000,
    fee: 1000,
  });
  const tx2id = await from.wallet.sendTx({
    toAddr: to.address,
    amount: 70000000,
    fee: 1000,
  });
  expect(tx1id !== tx2id).toBe(true);
  expect([...from.wallet.pending.transactions].length).toBe(2);
  expect(from.wallet.utxoSet.inUse.length).toBe(2);
});
