import Mnemonic from 'bitcore-mnemonic';
import bitcore from 'bitcore-lib-cash';
import passworder from 'browser-passworder';
import { Buffer } from 'safe-buffer';
import { Network, Transaction, WalletSave, Utxo, TxSend } from 'custom-types';
import { dummyTx } from './dummyTx';

const DEFAULT_FEE = 1000;
// TODO: default network in global config
const DEFAULT_NETWORK = 'kaspatest';
const API_ENDPOINT = 'http://localhost:11224';

type AddressDict = Record<string, bitcore.PrivateKey>;

/** Class representing an HDWallet with derivable child addresses */
class Wallet {
  private HDWallet: bitcore.HDPrivateKey;

  /**
   * The summed balance across all of Wallet's discovered addresses.
   */
  balance: number | undefined = undefined;

  /**
   * Current network.
   */
  network: Network = DEFAULT_NETWORK;

  /**
   * The derived keypair that will be used as this Wallet's receive address.
   */
  currentChild: bitcore.HDPrivateKey;

  /**
   * The next receiving address in cashaddr format
   */
  address: string;

  /**
   * The next change address in cashaddr format
   */
  changeAddress: string;

  /**
   * The index of the derivation path
   */
  childIndex = 0;

  /**
   * The index of the change path
   */
  changeIndex = 0;

  /**
   * A 12 word mnemonic that is only present when the wallet was just created.
   */
  mnemonic: string;

  private utxoSet: Set<Utxo> = new Set();

  private addressDict: AddressDict = {};

  /**
   * Transaction history
   */
  transactions: Transaction[] = dummyTx;

  /** Create a wallet.
   * @param privKey (optional) Saved wallet's private key.
   * @param seedPhrase (optional) Saved wallet's seed phrase.
   */
  constructor(privKey?: string, seedPhrase?: string) {
    if (privKey && seedPhrase) {
      this.HDWallet = new bitcore.HDPrivateKey(privKey);
      this.mnemonic = seedPhrase;
    } else {
      const temp = new Mnemonic(Mnemonic.Words.ENGLISH);
      this.mnemonic = temp.toString();
      this.HDWallet = new bitcore.HDPrivateKey(temp.toHDPrivateKey().toString());
    }
    this.deriveAddress();
    this.getUtxos();
  }

  async getUtxos(): void {
    const req = await fetch(`${API_ENDPOINT}/utxos/address/${this.address}`);
    const res = await req.json();
    res.utxos.map((utxo) => {
      this.utxoSet.add(utxo);
    });
  }

  /**
   * 
   {
    "utxos":[
        {
            "transactionId":"string",
            "index":int,
            "value":"string",
            "scriptPubKey":"string",
            "acceptingBlockHash":"string",
            "acceptingBlockBlueScore":"string",
            "isCoinbase":boolean,
            "confirmations":"string",
            "isSpendable":boolean
        },
        {
            "transactionId":"string",
            "index":int,
            "value":"string",
            "scriptPubKey":"string",
            "acceptingBlockHash":"string",
            "acceptingBlockBlueScore":"string",
            "isCoinbase":boolean,
            "confirmations":"string",
            "isSpendable":boolean
        }
      ]
    }
   */

  // TODO: add type of key to derive (change, etc)
  deriveAddress(isChange: boolean): string {
    if (isChange) {
      const derivePath = `m/44'/972/0'/1'/${this.changeIndex}`;
      const privateKey = this.HDWallet.deriveChild(derivePath);
      this.changeAddress = privateKey.privateKey.toAddress(this.network).toString();
      this.addressDict[privateKey.toString()] = privateKey;
      this.changeIndex += 1;
      return this.changeAddress;
    }
    const derivePath = `m/44'/972/0'/0'/${this.childIndex}'`;
    const privateKey = this.HDWallet.deriveChild(derivePath);
    this.address = privateKey.privateKey.toAddress(this.network).toString();
    this.addressDict[this.address] = privateKey;
    this.childIndex += 1;
    return this.address;
  }

  private addressDiscovery(): void {
    // make a bunch of queries looking for transactions and UTXOs
    // return:
    //  set of UnspentOutputs,
    //  set of Transactions,
    //  address dictionary (key: address, value: bitcore.PrivateKey),
    //  new index
  }

  private selectUtxos(txAmount: integer): Utxo[] {
    const arr: Utxo[] = [];
    let totalVal = 0;
    for (let i = 0; i < this.utxoSet.length && totalVal < txAmount; i += 1) {
      arr.push(this.utxoSet[i]);
      totalVal += this.utxoSet[i].value;
    }
    return arr;
  }

  // TODO: convert amount to sompis aka satoshis
  // TODO: bn
  async sendTx({ toAddr, amount, fee }: TxSend): Promise<TxResponse> {
    // utxo selection
    if (!fee) fee = DEFAULT_FEE;
    if (amount < this.balance)
      throw new Error(
        `Not enough balance. Amount: ${amount}, Fee: ${fee}, Balance: ${this.balance}`
      );
    const utxos = this.selectUtxos(amount + fee);
    const privKeys = utxos.reduce((prev, cur) => {
      prev.add(this.addressDict[cur.address]);
      return prev;
    }, new Set());
    // serialize
    const tx: bitcore.Transaction = new bitcore.Transaction()
      .from(utxos)
      .to(toAddr, amount)
      .setVersion(1)
      .fee(fee)
      .sign(privKeys, bitcore.crypto.Signature.SIGHASH_ALL, 'schnorr');
    const rawTransaction = tx.toString();
    // send
    const response = await fetch(`${API_ENDPOINT}/transaction`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        ContentType: 'application/json',
      },
      body: JSON.stringify({ rawTransaction }),
    });
    jsonRes = await response.json();
    // jsonRes.error
  }

  /**
   *  Converts a mnemonic to a new wallet.
   * @param seedPhrase The 12 word seed phrase.
   * @returns new Wallet
   */
  static fromMnemonic(seedPhrase: string): Wallet {
    const privKey = new Mnemonic(seedPhrase.trim()).toHDPrivateKey().toString();
    const wallet = new this(privKey, seedPhrase);
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
    const savedWallet = JSON.parse(Buffer.from(decrypted).toString('utf8')) as WalletSave;
    const myWallet = new this(savedWallet.privKey, savedWallet.seedPhrase);
    return myWallet;
  }

  /**
   * Generates encrypted wallet data.
   * @param password user's chosen password
   * @returns Promise that resolves to object-like string. Suggested to store as string for .import().
   */
  async export(password: string): Promise<string> {
    const savedWallet: WalletSave = {
      privKey: this.HDWallet.toString(),
      seedPhrase: this.mnemonic,
    };
    return passworder.encrypt(password, Buffer.from(JSON.stringify(savedWallet), 'utf8'));
  }
}

export default Wallet;
