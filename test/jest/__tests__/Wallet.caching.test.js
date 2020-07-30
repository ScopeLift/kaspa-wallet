import Wallet from '../../../src/wallet/Wallet';

test('It can cache and then restore state', async () => {
  const walletA = Wallet.fromMnemonic(
    'width behave shuffle since inspire ladder predict end pool walnut chapter credit'
  );
  const walletB = Wallet.fromMnemonic(
    'width behave shuffle since inspire ladder predict end pool walnut chapter credit'
  );
  await walletA.addressDiscovery();
  walletB.restoreCache(walletA.cache);
  expect(walletA.balance).toEqual(walletB.balance);
  expect(walletA.addressManager.shouldFetch).toEqual(walletB.addressManager.shouldFetch);
  expect(walletA.transactions.length).toEqual(walletB.transactions.length);
});
