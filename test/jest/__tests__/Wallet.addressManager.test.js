import { walletTestSerialize } from '../data/mockWallets';
const { to, from } = walletTestSerialize;

let receiveAddrs = from.wallet.addressManager.getAddresses(10, 'receive');
let changeAddrs = from.wallet.addressManager.getAddresses(5, 'change');

test(`Address manager derives addresses`, async () => {
  expect(receiveAddrs.length).toEqual(10);
  expect(changeAddrs.length).toEqual(5);
});

test(`Address manager saves derived keypairs to dictionary`, () => {
  expect(Object.keys(from.wallet.addressManager.receiveAddress.keypairs).length).toEqual(10);
  expect(Object.keys(from.wallet.addressManager.changeAddress.keypairs).length).toEqual(5);
  expect(Object.keys(from.wallet.addressManager.all).length).toEqual(15);
});

test(`Address manager objects can advance and next`, () => {
  from.wallet.addressManager.receiveAddress.advance(10);
  from.wallet.addressManager.changeAddress.advance(5);
  from.wallet.addressManager.changeAddress.next();
  expect(Object.keys(from.wallet.addressManager.receiveAddress.keypairs).length).toEqual(11);
  expect(Object.keys(from.wallet.addressManager.changeAddress.keypairs).length).toEqual(6);
  expect(Object.keys(from.wallet.addressManager.all).length).toEqual(17);
});
