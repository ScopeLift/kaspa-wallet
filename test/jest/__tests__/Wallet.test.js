import Wallet from '../../../src/wallet/Wallet';

test(`Networks: prefix changes`, () => {
  let myWallet = new Wallet();
  expect(myWallet.addressManager.receiveAddress.current.address).toContain(myWallet.network);
  myWallet.network = 'kaspa';
  expect(myWallet.network).toEqual('kaspa');
  expect(myWallet.addressManager.receiveAddress.current.address).toContain('kaspa');
});

test(`Import/Export: correct password`, async () => {
  let myWallet = new Wallet();
  let walletFile = await myWallet.export('dumbpassword');
  let importedWallet = await Wallet.import('dumbpassword', walletFile);
  expect(myWallet.addressManager.address).toEqual(importedWallet.addressManager.address);
  let walletFile2 = await importedWallet.export('!@)#!(% !#okありがとう');
  let importedWallet2 = await Wallet.import('!@)#!(% !#okありがとう', walletFile2);
  expect(importedWallet.addressManager.address).toEqual(importedWallet2.addressManager.address);
  expect(importedWallet.addressManager.receiveAddress.next()).toEqual(
    importedWallet2.addressManager.receiveAddress.next()
  );
});

test(`Import/Export: incorrect password`, async () => {
  let myWallet = new Wallet();
  let walletFile = await myWallet.export('dumb!password123');
  let throws = async () => await Wallet.import('wrongpassword', walletFile);
  await expect(throws()).rejects.toThrowError('Incorrect password');
});

test(`Seed phrase: provides a seed phrase`, () => {
  let myWallet = new Wallet();
  expect(typeof myWallet.mnemonic).toBe('string');
  expect(myWallet.mnemonic.split(' ').length).toBe(12);
});

test(`Seed phrase: can be used to recover wallet`, () => {
  let myWallet = new Wallet();
  let recoveredWallet = Wallet.fromMnemonic(myWallet.mnemonic);
  expect(myWallet.addressManager.address).toEqual(recoveredWallet.addressManager.address);
  // Trim test!
  let recoveredWallet2 = Wallet.fromMnemonic(`  ${myWallet.mnemonic}  `);
  expect(myWallet.addressManager.address).toEqual(recoveredWallet2.addressManager.address);
});
