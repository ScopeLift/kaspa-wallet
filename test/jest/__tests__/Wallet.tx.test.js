import Wallet from '../../../src/wallet/Wallet';
import mockUtxos from '../data/mockUtxo.json';
import { walletTestSerialize } from '../data/mockWallets';
const { to, from } = walletTestSerialize;

test(`Wallet: serializes a transaction correctly given inputs`, async () => {
  let expected =
    '0100000001b13ea93d2dde9c708a823cc4418558eb2df35e050af37e23f3c8ba8c42fd5845000000006441b42e3af9c1207b7180d415183ffcfb0b96e2472de020e0f67997f3ac07c069630d623c5cbc9b415cf48901246ea23193dc2efa82b9a5a65bcb31600f3c6ba4bc012103cac8d1b5d9a6f55f6bc9e5b4afcb418268753cdcb15b1c807cd4794193437f02ffffffffffffffff02801d2c04000000001976a91442592092913c042a0a266b73a327f956fba2d03288ac98bfc901000000001976a91409a5e3cbc20332e61fa295c26900f12d0c4077b788ac00000000000000000000000000000000000000000000000000000000';
  from.wallet.addUtxos(mockUtxos, from.address);
  let rawTx = from.wallet.composeTx({
    toAddr: to.address,
    amount: 70000000,
    fee: 1000,
    changeAddrOverride: from.address,
  });
  expect(rawTx).toEqual(expected);
});
