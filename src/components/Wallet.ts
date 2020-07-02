import bitcore from 'bitcore-lib-cash';
import passworder from 'browser-passworder';
import { Buffer } from 'safe-buffer';

class Wallet {
  private HDWallet: bitcore.HDPrivateKey;

  network: string;

  currentChild: bitcore.HDPrivateKey;

  publicKey: string;

  childIndex: number;

  // mnemonic: string;

  // static fromMnemonic(seedPhrase: string): Wallet {
  //   return new this();
  // }

  constructor(privKey?: string) {
    // TODO: default network in global config
    this.network = 'kaspadev';
    if (privKey) {
      this.HDWallet = new bitcore.HDPrivateKey(privKey);
    } else {
      this.HDWallet = new bitcore.HDPrivateKey();
    }
    this.childIndex = 0;
    this.currentChild = this.HDWallet.deriveChild("m/44'/972/0'/0'/0");
    this.publicKey = this.currentChild.privateKey.toAddress(this.network).toString();
    // this.discoverAccounts();
  }

  private newDerivePath(): string {
    this.childIndex += 1;
    return `m/44'/972/0'/0'/${this.childIndex}'`;
  }

  // TODO: add type of key to derive (change, etc)
  deriveNew(): string {
    this.currentChild = this.HDWallet.deriveChild(this.newDerivePath());
    this.publicKey = this.currentChild.privateKey.toAddress(this.network).toString();
    return this.publicKey;
  }

  // async discoverAccounts(): Promise<void> {

  // }

  static async import(password: string, localStorageValue: string): Promise<Wallet> {
    const decrypted = await passworder.decrypt(password, localStorageValue);
    const privKey = Buffer.from(decrypted).toString();
    return new this(privKey);
  }

  async export(password: string): Promise<string> {
    return passworder.encrypt(password, Buffer.from(this.HDWallet.toString(), 'utf8'));
  }
}

export default Wallet;
