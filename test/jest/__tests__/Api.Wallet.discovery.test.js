// @ts-nocheck

import { apiWallets } from '../data/mockWallets';
const { to, from } = apiWallets;
import * as api from '../../../src/wallet/apiHelpers';

jest.mock('../../../src/wallet/apiHelpers');

test('Wallet: discovers things in your wallet', async () => {
  await from.wallet.addressDiscovery();
  expect(from.wallet.transactions.length > 0).toBe(true);
  expect([...from.wallet.transactionStorage].length).toBe(api.getUtxos.mock.calls.length);
  expect(from.wallet.utxoSet.availableBalance).toEqual(6e8);
}, 5e6);
