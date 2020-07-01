/* eslint-disable */
import bitcore from 'bitcore-lib-cash';
import passworder from 'browser-passworder';

export default class Wallet {
  private HDWallet: any;
  network: string;
  currentChild: any;
  publicKey: string;
  childIndex: number;
  // mnemonic: string;

  constructor(seed?: string, network?: string) {
    // TODO: default network in global config
    this.network = network || 'kaspadev';
    this.HDWallet = new bitcore.HDPrivateKey();
    this.childIndex = 0;
    this.currentChild = this.HDWallet.deriveChild(`m/44'/972/0'/0'/0`);
    this.publicKey = this.currentChild.privateKey.toAddress(this.network).toString();
  }

  private newDerivePath(): string {
    this.childIndex++;
    return `m/44'/972/0'/0'/${this.childIndex}'`;
  }

  deriveNew(type?: string): string {
    this.currentChild = this.HDWallet.deriveChild(this.newDerivePath());
    this.publicKey = this.currentChild.privateKey.toAddress(this.network).toString();
    return this.publicKey;
  }

  async export(password: string): Promise<string> {
    return passworder.encrypt(password, this.HDWallet.privateKey.toString());
  }
}
