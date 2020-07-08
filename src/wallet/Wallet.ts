import Mnemonic from 'bitcore-mnemonic';
import bitcore from 'bitcore-lib-cash';
import passworder from 'browser-passworder';
import { Buffer } from 'safe-buffer';
import { Network, Transaction } from 'custom-types';

/** Class representing an HDWallet with derivable child addresses */
class Wallet {
  private HDWallet: bitcore.HDPrivateKey;

  /**
   * The summed balance across all of Wallet's discovered addresses.
   */
  balance: number | undefined = undefined;

  /**
   * Current network. Set with useNetwork()
   */
  network: Network = 'kaspadev'; // TODO: default network in global config

  /**
   * The derived keypair that will be used as this Wallet's receive address.
   */
  currentChild: bitcore.HDPrivateKey;

  /**
   * The next receiving address in cashaddr format
   */
  address: string;

  /**
   * The index of the derivation path
   */
  childIndex = 0;

  /**
   * A 12 word mnemonic that is only present when the wallet was just created.
   */
  mnemonic: string | undefined = undefined;

  /**
   * Transaction history (TODO remove dummy transaction data)
   */
  transactions: Array<Transaction> = [
    {
      transactionId: '41d00aa0f4661b86e084de508a459dd8991dac9ac123ad3fe5d5c98d64820d55',
      transactionHash: '3d484feb3cb924bc665aece6cbeeb4091cd340a27ff8db44eddb72f5b0fed6ee',
      acceptingBlockHash: '000015c46d901e6e1cecc94be2c5c4a43b10e325700a838005d942538696b83d',
      acceptingBlockBlueScore: 141621,
      subnetworkId: '0000000000000000000000000000000000000001',
      lockTime: 1593702802586,
      gas: 0,
      payloadHash: 'c8373cff0f5e98000791395a71cf6256a09fb5812c699aad5ff12026319c1a54',
      payload:
        '1976a914711b8d56dcf9a93f0375558d8c815881b203654488ac3c1554c5b3b458392f6b61737061642f',
      inputs: [],
      outputs: [
        {
          address: 'kaspatest:qpc3hr2kmnu6j0crw42cmryptzqmyqm9gstqp5r863',
          scriptPubKey: '76a914711b8d56dcf9a93f0375558d8c815881b203654488ac',
          value: '5000000000',
        },
        {
          address: 'kaspatest:qpc3hr2kmnu6j0crw42cmryptzqmyqm9gstqp5r863',
          scriptPubKey: '76a914711b8d56dcf9a93f0375558d8c815881b203654488ac',
          value: '5000000000',
        },
        {
          address: 'kaspatest:qpc3hr2kmnu6j0crw42cmryptzqmyqm9gstqp5r863',
          scriptPubKey: '76a914711b8d56dcf9a93f0375558d8c815881b203654488ac',
          value: '5000000000',
        },
        {
          address: 'kaspatest:qpc3hr2kmnu6j0crw42cmryptzqmyqm9gstqp5r863',
          scriptPubKey: '76a914711b8d56dcf9a93f0375558d8c815881b203654488ac',
          value: '5000000000',
        },
      ],
      mass: 433,
      confirmations: 200,
    },
  ];

  /** Create a wallet.
   * @param privKey (optional) Use a private key to restore a wallet.
   */
  constructor(privKey?: string) {
    if (privKey) {
      this.HDWallet = new bitcore.HDPrivateKey(privKey);
    } else {
      const temp = new Mnemonic(Mnemonic.Words.ENGLISH);
      this.mnemonic = temp.toString();
      this.HDWallet = new bitcore.HDPrivateKey(temp.toHDPrivateKey().toString());
    }
    this.currentChild = this.HDWallet.deriveChild("m/44'/972/0'/0'/0'");
    this.address = this.currentChild.privateKey.toAddress(this.network).toString();
    // this.discoverAccounts();
  }

  private newDerivePath(): string {
    this.childIndex += 1;
    return `m/44'/972/0'/0'/${this.childIndex}'`;
  }

  // TODO: add type of key to derive (change, etc)
  deriveChild(): string {
    this.currentChild = this.HDWallet.deriveChild(this.newDerivePath());
    this.address = this.currentChild.privateKey.toAddress(this.network).toString();
    return this.address;
  }

  // async discoverAccounts(): Promise<void> {

  // }

  /**
   *  Converts a mnemonic to a new wallet.
   * @param seedPhrase The 12 word seed phrase.
   * @returns new Wallet
   */
  static fromMnemonic(seedPhrase: string): Wallet {
    const mne = new Mnemonic(seedPhrase.trim());
    const wallet = new this(mne.toHDPrivateKey().toString());
    wallet.mnemonic = seedPhrase;
    return wallet;
  }

  /**
   * Creates a new Wallet from encrypted wallet data.
   * @param password the password the user encrypted their seed phrase with
   * @param encryptedMnemonic the encrypted seed phrase from local storage
   * @throws Will throw "Incorrect password" if password is wrong
   */
  static async import(password: string, encryptedMnemonic: string): Promise<Wallet> {
    const decrypted = await passworder.decrypt(password, encryptedMnemonic);
    // @ts-ignore
    const seedPhrase = Buffer.from(decrypted, 'utf8').toString();
    return this.fromMnemonic(seedPhrase);
  }

  /**
   * Generates encrypted wallet data.
   * @param password user's chosen password
   * @returns Promise that resolves to object-like string. Suggested to store as string for .import().
   */
  async export(password: string): Promise<string> {
    // @ts-ignore
    return passworder.encrypt(password, Buffer.from(this.mnemonic, 'utf8'));
  }
}

export default Wallet;
