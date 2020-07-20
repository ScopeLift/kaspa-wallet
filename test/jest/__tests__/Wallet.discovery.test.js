import { walletTestSerialize } from '../data/mockWallets';
const { to, from } = walletTestSerialize;
import * as api from '../../../src/wallet/apiHelpers';

test('Wallet: discovers 20 addresses if no tx', async () => {
  await from.wallet.addressDiscovery();
  expect(from.wallet.balance).toEqual(6e7);
});
