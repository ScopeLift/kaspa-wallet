import Mnemonic from 'bitcore-mnemonic';
import bitcore from 'bitcore-lib-cash';
import passworder from 'browser-passworder';
import { Buffer } from 'safe-buffer';
import { Network, Transaction, WalletSave, Utxo, TxSend, AddressDict } from 'custom-types';
import { dummyTx } from './dummyTx';
import { DEFAULT_FEE, DEFAULT_NETWORK } from '../../config.json';

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

  private utxoSet: bitcore.Transaction.UnspentOutput[] = [];

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
    this.deriveChangeAddress();
    // this.getUtxos();
  }

  deriveAddress(): string {
    const derivePath = `m/44'/972/0'/0'/${this.childIndex}'`;
    const { privateKey } = this.HDWallet.deriveChild(derivePath);
    this.currentChild = privateKey;
    this.address = privateKey.toAddress(this.network).toString();
    this.addressDict[this.address] = privateKey;
    this.childIndex += 1;
    return this.address;
  }

  deriveChangeAddress(): string {
    const derivePath = `m/44'/972/0'/1'/${this.changeIndex}`;
    const { privateKey } = this.HDWallet.deriveChild(derivePath);
    this.changeAddress = privateKey.toAddress(this.network).toString();
    this.addressDict[this.changeAddress] = privateKey;
    this.changeIndex += 1;
    return this.changeAddress;
  }

  private addressDiscovery(threshold: number): void {
    console.log(threshold);
    console.log(this.address);
    // make a bunch of queries looking for transactions and UTXOs
    // desired side-effects:
    //  set of UnspentOutputs,
    //  set of Transactions,
    //  address dictionary (key: address, value: bitcore.PrivateKey),
    //  new index
    // ['main', 'change'].forEach((deriveType) => {
    //   for (let i = 0; i < threshold; i++) {
    //     const addr = deriveType === "main" ? this.deriveAddress() : this.deriveChangeAddress();
    //     const req = await fetch(`${API_ENDPOINT}/utxos/${addr}`);
    //     const res = req.json();
    //     this.addUtxos(res.utxos);
    //   }
    // });
  }

  private selectUtxos(txAmount: number): bitcore.Transaction.UnspentOutput[] {
    const arr: Utxo[] = [];
    let totalVal = 0;
    Object.values(this.utxoSet).some((utxo) => {
      arr.push(utxo);
      totalVal += utxo.satoshis;
      return totalVal >= txAmount;
    });
    if (totalVal < txAmount)
      throw new Error(`Not enough balance. Need: ${txAmount}, UTXO Balance: ${totalVal}`);
    return arr;
  }

  addUtxos(utxos: Utxo[], address: string): void {
    utxos.forEach((utxo) => {
      this.utxoSet.push(
        new bitcore.Transaction.UnspentOutput({
          txid: utxo.transactionId,
          address,
          vout: utxo.index,
          scriptPubKey: utxo.scriptPubKey,
          satoshis: utxo.value,
        })
      );
    });
  }

  // TODO: convert amount to sompis aka satoshis
  // TODO: bn
  composeTx({
    toAddr,
    amount,
    fee,
    changeAddrOverride,
  }: TxSend & { changeAddrOverride?: string }): string {
    // utxo selection
    if (!fee) fee = DEFAULT_FEE;
    const utxos = this.selectUtxos(amount + fee);
    const privKeys = utxos.reduce((prev, cur) => {
      prev.push(this.addressDict[cur.address]);
      return prev;
    }, []);
    const changeAddr = changeAddrOverride || this.deriveChangeAddress();
    // serialize
    const tx: bitcore.Transaction = new bitcore.Transaction()
      .from(utxos)
      .to(toAddr, amount)
      .setVersion(1)
      .fee(fee)
      .change(changeAddr)
      .sign(privKeys, bitcore.crypto.Signature.SIGHASH_ALL, 'schnorr');
    return tx.toString();
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
