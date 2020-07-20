import { walletTestSerialize } from '../data/mockWallets';
const { to, from } = walletTestSerialize;
import * as api from '../../../src/wallet/apiHelpers';

test('Wallet: discovers 20 addresses if no tx', async () => {
  let { addresses, transactions, utxos } = await from.wallet.addressDiscovery();
  expect(addresses.length).toEqual(20);
});
