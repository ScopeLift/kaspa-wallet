import Wallet from '../../../src/components/Wallet';

test(`Import/Export: correct password`, async () => {
  let myWallet = new Wallet();
  let walletFile = await myWallet.export('dumbpassword');
  let importedWallet = await Wallet.import('dumbpassword', walletFile);
  expect(myWallet.publicKey).toEqual(importedWallet.publicKey);
  let walletFile2 = await importedWallet.export('!@)#!(% !#okありがとう');
  let importedWallet2 = await Wallet.import('!@)#!(% !#okありがとう', walletFile2);
  expect(importedWallet.publicKey).toEqual(importedWallet2.publicKey);
  expect(importedWallet.deriveChild()).toEqual(importedWallet2.deriveChild());
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
  expect(myWallet.publicKey).toEqual(recoveredWallet.publicKey);
});
