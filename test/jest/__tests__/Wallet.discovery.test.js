import { walletTestSerialize } from '../data/mockWallets';
const { to, from } = walletTestSerialize;
import * as api from '../../../src/wallet/apiHelpers';

test('Wallet: discovers 20 addresses if no tx', async () => {
  await from.wallet.addressDiscovery();
  expect(from.wallet.utxoSet.availableBalance).toEqual(6e8);
}, 5e6);
