import { apiWallets } from '../data/mockWallets';
const { to, from } = apiWallets;
import * as api from '../../../src/wallet/apiHelpers';

test('Wallet: discovers things in your wallet', async () => {
  await from.wallet.addressDiscovery();
  expect(from.wallet.transactions.length > 0).toBe(true);
  console.log(from.wallet.transactions);
  expect(from.wallet.utxoSet.availableBalance).toEqual(6e8);
}, 5e6);
