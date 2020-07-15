import Wallet from '../../../src/wallet/Wallet';
import mockUtxos from './mockUtxo.json';
import { apiTest } from './mockWallets';
const { to, from } = apiTest;
import * as api from '../../../src/wallet/apiHelpers';
import { API_ENDPOINT } from '../../../config.json';

test(`Wallet: serializes and sends a tx`, async () => {
  let utxoReq = await api.getUtxos(from.address, API_ENDPOINT);
  let utxos = utxoReq.data.filter((utxo) => utxo.isSpendable);
  from.wallet.addUtxos(utxos, from.address);
  let rawTx = from.wallet.composeTx({
    toAddr: to.address,
    amount: 80000000,
    fee: 1000,
    changeAddrOverride: from.address,
  });
  let attempt = await api.postTx(rawTx, API_ENDPOINT);
  expect(attempt.error).toBe(undefined);
  expect(attempt.data).toEqual(true);
});
