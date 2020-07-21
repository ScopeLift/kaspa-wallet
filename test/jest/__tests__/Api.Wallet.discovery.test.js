import { walletTestSerialize } from '../data/mockWallets';
const { to, from } = walletTestSerialize;
import * as api from '../../../src/wallet/apiHelpers';

test('Wallet: discovers things in your wallet', async () => {
  await from.wallet.addressDiscovery();
  expect(from.wallet.transactionsSorted.length > 0).toBe(true);
  console.log(from.wallet.transactionsSorted);
  expect(from.wallet.utxoSet.availableBalance).toEqual(6e8);
}, 5e6);
