import bitcore from 'bitcore-lib-cash';
import Mnemonic from 'bitcore-mnemonic';
import passworder from 'browser-passworder';
import { Buffer } from 'safe-buffer';

/** Class representing an HDWallet with derivable child addresses */
class Wallet {
  private HDWallet: bitcore.HDPrivateKey;

  /**
   * The summed balance across all of Wallet's discovered addresses.
   */
  balance: number | undefined = undefined;

  /**
   * Current network string. Set with useNetwork()
   */
  private network = 'kaspadev'; // TODO: default network in global config

  /**
   * The derived keypair that will be used as this Wallet's receive address.
   */
  currentChild: bitcore.HDPrivateKey;

  /**
   * The cashaddr-formatted public key of the next receiving address.
   */
  publicKey: string;

  /**
   * The index of
   */
  childIndex = 0;

  /**
   * A 12 word mnemonic that is only present when the wallet was just created.
   * When the wallet is imported (from localstorage or file) or restored from mnemonic, this value will be undefined.
   */
  mnemonic: string | undefined = undefined;

  /** Create a wallet.
   * @param privKey (optional) Use a private key to restore a wallet.
   */
  constructor(privKey?: string) {
    if (privKey) {
      this.HDWallet = new bitcore.HDPrivateKey(privKey);
    } else {
      /* eslint-disable */
      const temp = new Mnemonic(Mnemonic.Words.ENGLISH);
      this.mnemonic = temp.toString();
      this.HDWallet = new bitcore.HDPrivateKey(temp.toHDPrivateKey().toString());
      /* eslint-enable */
    }
    this.currentChild = this.HDWallet.deriveChild("m/44'/972/0'/0'/0'");
    this.publicKey = this.currentChild.privateKey.toAddress(this.network).toString();
    // this.discoverAccounts();
  }

  private newDerivePath(): string {
    this.childIndex += 1;
    return `m/44'/972/0'/0'/${this.childIndex}'`;
  }

  // TODO: add type of key to derive (change, etc)
  deriveChild(): string {
    this.currentChild = this.HDWallet.deriveChild(this.newDerivePath());
    this.publicKey = this.currentChild.privateKey.toAddress(this.network).toString();
    return this.publicKey;
  }

  // async discoverAccounts(): Promise<void> {

  // }

  /**
   * Change the network. This will effect the public key prefix.
   * @param network Should be one of the 5 kaspa netowrks.
   */
  useNetwork(network: string): void {
    this.network = network;
  }

  /**
   *  Converts a mnemonic to a new wallet.
   * @param seedPhrase The 12 word seed phrase.
   * @returns new Wallet
   */
  static fromMnemonic(seedPhrase: string): Wallet {
    /* eslint-disable */
    let mne = new Mnemonic(seedPhrase);
    return new this(mne.toHDPrivateKey().toString());
    /* eslint-enable */
  }

  /**
   * Creates a new Wallet from encrypted wallet data.
   * @param password the password the user encrypted with
   * @param encryptedKey the data from the wallet file
   * @throws Will throw "Incorrect password" if password is wrong
   */
  static async import(password: string, encryptedKey: string): Promise<Wallet> {
    const decrypted = await passworder.decrypt(password, encryptedKey);
    const privKey = Buffer.from(decrypted).toString();
    return new this(privKey);
  }

  /**
   * Generates encrypted wallet data.
   * @param password user's chosen password
   * @returns Promise that resolves to object-like string. Suggested to store as string for .import().
   */
  async export(password: string): Promise<string> {
    return passworder.encrypt(password, Buffer.from(this.HDWallet.toString(), 'utf8'));
  }
}

export default Wallet;
