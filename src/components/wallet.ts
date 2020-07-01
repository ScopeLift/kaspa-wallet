/* eslint-disable */
import bitcore from 'bitcore-lib-cash';

export default class Wallet {
  private HDWallet: any;
  network: string;
  currentChild: any;

  constructor(seed?: string, network?: string) {
    this.HDWallet = new bitcore.HDPrivateKey();
    this.currentChild = this.HDWallet.deriveChild(`m/44'/972/0'/0'/0`);
    // TODO: default network in global config
    this.network = network || 'kaspadev';
  }

  publicKey(): string {
    return this.currentChild.privateKey.toAddress(this.network).toString();
  }
}
