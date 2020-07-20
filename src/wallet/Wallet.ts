import Mnemonic from 'bitcore-mnemonic';
import bitcore from 'bitcore-lib-cash';
import passworder from 'browser-passworder';
import { Buffer } from 'safe-buffer';
import { Network, WalletSave, Api, TxSend, AddressDict } from 'custom-types';
import { DEFAULT_FEE, DEFAULT_NETWORK } from '../../config.json';
import * as api from './apiHelpers';
import { UtxoSet } from './UtxoSet';

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

  utxoSet = new UtxoSet();

  private addressDict: AddressDict = {};

  /**
   * Transaction history
   */
  transactionsSorted: Api.Transaction[] = [];

  transactionsStorage: Record<string, Api.Transaction[]> = {};

  /** Create a wallet.
   * @param walletSave (optional)
   * @param walletSave.privKey Saved wallet's private key.
   * @param walletSave.seedPhrase Saved wallet's seed phrase.
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
  }

  /**
   * Derives a new receive address. Sets related instance properties.
   */
  deriveAddress(): string {
    const derivePath = `m/44'/972/0'/0'/${this.childIndex}'`;
    const { privateKey } = this.HDWallet.deriveChild(derivePath);
    this.currentChild = privateKey;
    this.address = privateKey.toAddress(this.network).toString();
    this.addressDict[this.address] = privateKey;
    this.childIndex += 1;
    return this.address;
  }

  /**
   * Derives a new change address. Sets related instance properties.
   */
  deriveChangeAddress(): string {
    const derivePath = `m/44'/972/0'/1'/${this.changeIndex}`;
    const { privateKey } = this.HDWallet.deriveChild(derivePath);
    this.changeAddress = privateKey.toAddress(this.network).toString();
    this.addressDict[this.changeAddress] = privateKey;
    this.changeIndex += 1;
    return this.changeAddress;
  }

  async updateUtxos(): Promise<void> {
    const addresses = Object.keys(this.addressDict);
    const utxoResults = await Promise.all(addresses.map((address) => api.getUtxos(address)));
    addresses.forEach((address, i) => {
      this.utxoSet.add(utxoResults[i].utxos, address);
    });
  }

  async updateTransactions(): Promise<void> {
    const addresses = Object.keys(this.addressDict);
    const txResults = await Promise.all(addresses.map((address) => api.getTransactions(address)));
    addresses.forEach((address, i) => {
      this.transactionsStorage[address] = txResults[i];
    });
    this.transactionsSorted = Object.values(this.transactionsStorage)
      .flat()
      .sort(
        (a, b) => a.acceptingBlockHash > b.acceptingBlockHash // TODO: get block by hash and look up timestamp
      );
  }

  /* eslint-disable-next-line */
  async addressDiscovery(threshold = 20): Promise<void> {
    const addresses = [];
    const deriveType = 'receive';
    let i = 0;
    while (i < threshold) {
      const addr = deriveType === 'receive' ? this.deriveAddress() : this.deriveChangeAddress();
      addresses.push(addr);
      i += 1;
    }
    await this.updateTransactions();
    await this.updateUtxos();
  }

  /**
   * Add UTXOs to UTXO set.
   * @param utxos Array of UTXOs from kaspa API.
   * @param address Address of UTXO owner.
   */
  // addUtxos(utxos: Api.Utxo[], address: string): void {
  //   utxos.forEach((utxo) => {
  //     const utxoId = utxo.transactionId + utxo.index.toString();
  //     if (!this.utxoSet[utxoId] && this.utxosInUse.indexOf(utxoId) !== utxoId)
  //       this.utxoSet[utxoId] = new bitcore.Transaction.UnspentOutput({
  //         txid: utxo.transactionId,
  //         address,
  //         vout: utxo.index,
  //         scriptPubKey: utxo.scriptPubKey,
  //         satoshis: utxo.value,
  //       });
  //   });
  // }

  // TODO: convert amount to sompis aka satoshis
  // TODO: bn
  /**
   * Compose a serialized, signed transaction
   * @param obj
   * @param obj.toAddr To address in cashaddr format (e.g. kaspatest:qq0d6h0prjm5mpdld5pncst3adu0yam6xch4tr69k2)
   * @param obj.amount Amount to send in sompis (100000000 (1e8) sompis in 1 KSP)
   * @param obj.fee Fee for miners in sompis
   * @param obj.changeAddrOverride Use this to override automatic change address derivation
   * @throws if amount is above `Number.MAX_SAFE_INTEGER`
   */
  composeTx({
    toAddr,
    amount,
    fee = DEFAULT_FEE,
    changeAddrOverride,
  }: TxSend & { changeAddrOverride?: string }): { id: string; rawTx: string; utxoIds: string[] } {
    if (!Number.isSafeInteger(amount)) throw new Error('Amount too large');
    const { utxos, utxoIds } = this.utxoSet.selectUtxos(amount + fee);
    const privKeys = utxos.reduce((prev, cur) => {
      prev.push(this.addressDict[cur.address]);
      return prev;
    }, []);
    const changeAddr = changeAddrOverride || this.deriveChangeAddress();
    const tx: bitcore.Transaction = new bitcore.Transaction()
      .from(utxos)
      .to(toAddr, amount)
      .setVersion(1)
      .fee(fee)
      .change(changeAddr)
      .sign(privKeys, bitcore.crypto.Signature.SIGHASH_ALL, 'schnorr');
    this.utxoSet.inUse.push(...utxoIds);
    this.utxoSet.updateBalance();
    return { id: tx.id, rawTx: tx.toString(), utxoIds };
  }

  /**
   * Send a transaction. Returns transaction id.
   * @param txParams
   * @param txParams.toAddr To address in cashaddr format (e.g. kaspatest:qq0d6h0prjm5mpdld5pncst3adu0yam6xch4tr69k2)
   * @param txParams.amount Amount to send in sompis (100000000 (1e8) sompis in 1 KSP)
   * @param txParams.fee Fee for miners in sompis
   * @throws `FetchError` if endpoint is down. API error message if tx error. Error if amount is too large to be represented as a javascript number.
   */
  async sendTx(txParams: TxSend): Promise<string> {
    const { id, rawTx } = this.composeTx(txParams);
    await api.postTx(rawTx);
    return id;
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
