import { apiWallets } from '../data/mockWallets';
const { to, from } = apiWallets;
import * as api from '../../../src/wallet/apiHelpers';

test(`Wallet: serializes and sends a tx`, async () => {
  let utxoReq = await api.getUtxos(from.address);
  let utxos = utxoReq.data.filter((utxo) => utxo.isSpendable);
  from.wallet.addUtxos(utxos, from.address);
  let attempt = await from.wallet.sendTx({
    toAddr: to.address,
    amount: 80000000,
    fee: 1000,
  });
  expect(typeof attempt).toEqual('string');
});
