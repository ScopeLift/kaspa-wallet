import { apiWallets } from '../data/mockWallets';
const { to, from } = apiWallets;
import * as api from '../../../src/wallet/apiHelpers';

jest.mock('../../../src/wallet/apiHelpers');

test(`Wallet: serializes and sends a tx`, async () => {
  let utxoReq = await api.getUtxos(from.address);
  let utxos = utxoReq.utxos.filter((utxo) => utxo.isSpendable);
  from.wallet.utxoSet.add(utxos, from.address);
  let attempt = await from.wallet.sendTx({
    toAddr: to.address,
    amount: 70000000,
    fee: 1000,
  });
  expect(typeof attempt).toEqual('string');
});
