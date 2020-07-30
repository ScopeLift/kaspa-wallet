import Mnemonic from 'bitcore-mnemonic';
import bitcore from 'bitcore-lib-cash';
import passworder from 'browser-passworder';
import { Buffer } from 'safe-buffer';
import {
  Network,
  SelectedNetwork,
  WalletSave,
  Api,
  TxSend,
  PendingTransactions,
} from 'custom-types';
import { logger } from '../utils/logger';
import { AddressManager } from './AddressManager';
import { UtxoSet } from './UtxoSet';
import * as api from './apiHelpers';
import { txParser } from './txParser';
import { DEFAULT_FEE, DEFAULT_NETWORK } from '../../config.json';

/** Class representing an HDWallet with derivable child addresses */
class Wallet {
  HDWallet: bitcore.HDPrivateKey;

  /**
   * The summed balance across all of Wallet's discovered addresses, minus amount from pending transactions.
   */
  balance: number | undefined = undefined;

  /**
   * Set by addressManager
   */
  get receiveAddress() {
    return this.addressManager.receiveAddress.current.address;
  }

  /**
   * Current network.
   */
  // @ts-ignore
  network: Network = DEFAULT_NETWORK.name as Network;

  /**
   * Current API endpoint for selected network
   */
  apiEndpoint = DEFAULT_NETWORK.apiBaseUrl;

  /**
   * A 12 word mnemonic.
   */
  mnemonic: string;

  utxoSet = new UtxoSet();

  addressManager: AddressManager;

  /* eslint-disable */
  pending: PendingTransactions = {
    transactions: {},
    get amount() {
      const transactions = Object.values(this.transactions);
      if (transactions.length === 0) return 0;
      return transactions.reduce((prev, cur) => prev + cur.amount, 0);
    },
    add(id: string, tx: { to: string; utxoIds: string[]; rawTx: string; amount: number }) {
      this.transactions[id] = tx;
    },
  };
  /**
   * Transactions sorted by hash.
   */
  transactions: Api.Transaction[] = [];

  /**
   * Transaction arrays keyed by address.
   */
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
    this.addressManager = new AddressManager(this.HDWallet, this.network);
    this.addressManager.receiveAddress.next();
  }

  /**
   * Queries API for address[] UTXOs. Adds UTXOs to UTXO set. Updates wallet balance.
   * @param addresses
   */
  async updateUtxos(addresses: string[]): Promise<void> {
    logger.log('info', `Getting utxos for ${addresses.length} addresses.`);
    const utxoResults = await Promise.all(
      addresses.map((address) => api.getUtxos(address, this.apiEndpoint))
    );
    addresses.forEach((address, i) => {
      const { utxos } = utxoResults[i];
      logger.log('info', `${address}: ${utxos.length} total UTXOs found.`);
      this.utxoSet.add(utxos, address);
    });
  }

  /**
   * Queries API for address[] transactions. Adds tx to transactions storage. Also sorts the entire transaction set.
   * @param addresses
   */
  async updateTransactions(addresses: string[]): Promise<string[]> {
    logger.log('info', `Getting transactions for ${addresses.length} addresses.`);
    const addressesWithTx: string[] = [];
    const txResults = await Promise.all(
      addresses.map((address) => api.getTransactions(address, this.apiEndpoint))
    );
    addresses.forEach((address, i) => {
      const { transactions } = txResults[i];
      logger.log('info', `${address}: ${transactions.length} transactions found.`);
      if (transactions.length !== 0) {
        const confirmedTx = transactions.filter((tx) => tx.confirmations > 0);
        this.transactionsStorage[address] = confirmedTx;
        addressesWithTx.push(address);
      }
    });
    this.transactions = txParser(this.transactionsStorage, Object.keys(this.addressManager.all));
    const pendingTxHashes = Object.keys(this.pending.transactions);
    if (pendingTxHashes.length > 0) {
      pendingTxHashes.forEach((hash) => {
        if (this.transactions.map((tx) => tx.transactionHash).includes(hash)) {
          this.deletePendingTx(hash);
        }
      });
    }
    const isActivityOnReceiveAddr =
      this.transactionsStorage[this.addressManager.receiveAddress.current.address] !== undefined;
    if (isActivityOnReceiveAddr) {
      this.addressManager.receiveAddress.next();
    }
    return addressesWithTx;
  }

  /**
   * Recalculates wallet balance.
   */
  updateBalance(): void {
    this.balance = this.utxoSet.totalBalance - this.pending.amount;
  }

  /**
   * Updates the selected network
   * @param network name of the network
   */
  async updateNetwork(network: SelectedNetwork): Promise<void> {
    this.demolishWalletState(network);
    this.network = network.name;
    this.apiEndpoint = network.apiBaseUrl;
    await this.addressDiscovery();
  }

  demolishWalletState(network: SelectedNetwork): void {
    this.utxoSet.clear();
    this.addressManager = new AddressManager(this.HDWallet, network.name);
    this.pending.transactions = {};
    this.transactions = [];
    this.transactionsStorage = {};
  }

  /**
   * Derives receiveAddresses and changeAddresses and checks their transactions and UTXOs.
   * @param threshold stop discovering after `threshold` addresses with no activity
   */
  async addressDiscovery(threshold = 20): Promise<void> {
    const doDiscovery = async (
      n: number,
      deriveType: 'receive' | 'change',
      offset: number
    ): Promise<number> => {
      const derivedAddresses = this.addressManager.getAddresses(n, deriveType, offset);
      const addresses = derivedAddresses.map((obj) => obj.address);
      logger.log(
        'info',
        `Fetching ${deriveType} address data for derived indices ${JSON.stringify(
          derivedAddresses.map((obj) => obj.index)
        )}`
      );
      const addressesWithTx = await this.updateTransactions(addresses);
      if (addressesWithTx.length === 0) {
        // address discovery complete
        const lastAddressIndexWithTx = offset - (threshold - n) - 1;
        logger.log(
          'info',
          `${deriveType}Address discovery complete. Last activity on address #${lastAddressIndexWithTx}. No activity from ${deriveType}#${
            lastAddressIndexWithTx + 1
          }~${lastAddressIndexWithTx + threshold}.`
        );
        return lastAddressIndexWithTx;
      }
      // else keep doing discovery
      const nAddressesLeft =
        derivedAddresses
          .filter((obj) => addressesWithTx.indexOf(obj.address) !== -1)
          .reduce((prev, cur) => Math.max(prev, cur.index), 0) + 1;
      return doDiscovery(nAddressesLeft, deriveType, offset + n);
    };
    const highestReceiveIndex = await doDiscovery(threshold, 'receive', 0);
    const highestChangeIndex = await doDiscovery(threshold, 'change', 0);
    this.addressManager.receiveAddress.advance(highestReceiveIndex + 1);
    this.addressManager.changeAddress.advance(highestChangeIndex + 1);
    logger.log(
      'info',
      `receive address index: ${highestReceiveIndex}; change address index: ${highestChangeIndex}`
    );
    await this.updateUtxos(Object.keys(this.transactionsStorage));
    this.runStateChangeHooks();
  }

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
  }: TxSend & { changeAddrOverride?: string }): {
    id: string;
    rawTx: string;
    utxoIds: string[];
    amount: number;
  } {
    if (!Number.isSafeInteger(amount)) throw new Error('Amount too large');
    const { utxos, utxoIds } = this.utxoSet.selectUtxos(amount + fee);
    // @ts-ignore
    const privKeys = utxos.reduce((prev: string[], cur) => {
      return [this.addressManager.all[String(cur.address)], ...prev];
    }, []);
    const changeAddr = changeAddrOverride || this.addressManager.changeAddress.next();
    try {
      const tx: bitcore.Transaction = new bitcore.Transaction()
        .from(utxos)
        .to(toAddr, amount)
        .setVersion(1)
        .fee(fee)
        .change(changeAddr)
        // @ts-ignore
        .sign(privKeys, bitcore.crypto.Signature.SIGHASH_ALL, 'schnorr');
      this.utxoSet.inUse.push(...utxoIds);
      this.pending.add(tx.id, { rawTx: tx.toString(), utxoIds, amount: amount + fee, to: toAddr });
      this.runStateChangeHooks();
      return { id: tx.id, rawTx: tx.toString(), utxoIds, amount: amount + fee };
    } catch (e) {
      this.addressManager.changeAddress.reverse();
      throw e;
    }
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
    try {
      await api.postTx(rawTx, this.apiEndpoint);
    } catch (e) {
      this.undoPendingTx(id);
      throw e;
    }
    return id;
  }

  async updateState(): Promise<void> {
    const activeAddrs = await this.updateTransactions(this.addressManager.shouldFetch);
    await this.updateUtxos(activeAddrs);
    this.runStateChangeHooks();
  }

  undoPendingTx(id: string): void {
    const { utxoIds } = this.pending.transactions[id];
    delete this.pending.transactions[id];
    this.utxoSet.release(utxoIds);
    this.addressManager.changeAddress.reverse();
    this.runStateChangeHooks();
  }

  /**
   * After we see the transaction in the API results, delete it from our pending list.
   * @param id The tx hash
   */
  deletePendingTx(id: string): void {
    // undo + delete old utxos
    const { utxoIds } = this.pending.transactions[id];
    delete this.pending.transactions[id];
    this.utxoSet.remove(utxoIds);
  }

  runStateChangeHooks(): void {
    this.utxoSet.updateUtxoBalance();
    this.updateBalance();
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
