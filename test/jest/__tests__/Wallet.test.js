import Wallet from '../../../src/components/Wallet';

test(`Import/Export: correct password`, async () => {
  let myWallet = new Wallet();
  let walletFile = await myWallet.export('dumbpassword');
  let importedWallet = await Wallet.import('dumbpassword', walletFile);
  expect(myWallet.publicKey).toEqual(importedWallet.publicKey);
  let walletFile2 = await importedWallet.export('!@)#!(% !#okありがとう');
  let importedWallet2 = await Wallet.import('!@)#!(% !#okありがとう', walletFile2);
  expect(importedWallet.publicKey).toEqual(importedWallet2.publicKey);
  expect(importedWallet.deriveNew()).toEqual(importedWallet2.deriveNew());
});

test(`Import/Export: incorrect password`, async () => {
  let myWallet = new Wallet();
  let walletFile = await myWallet.export('dumb!password123');
  let throws = async () => await Wallet.import('wrongpassword', walletFile);
  await expect(throws()).rejects.toThrowError('Incorrect password');
});
