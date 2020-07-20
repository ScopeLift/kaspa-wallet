import bitcore from 'bitcore-lib-cash';
import { Network } from 'custom-types';

export class AddressManager {
  constructor(HDWallet: bitcore.HDPrivateKey, network: Network) {
    this.HDWallet = HDWallet;
    this.network = network;
  }

  private HDWallet: bitcore.HDPrivateKey;

  network: Network;

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

  receive: Record<string, bitcore.PrivateKey> = {};

  change: Record<string, bitcore.PrivateKey> = {};

  get all(): Record<string, bitcore.PrivateKey> {
    return { ...this.receive, ...this.change };
  }

  /**
   * Derives a new receive address. Sets related instance properties.
   */
  deriveAddress(): string {
    const derivePath = `m/44'/972/0'/0'/${this.childIndex}'`;
    const { privateKey } = this.HDWallet.deriveChild(derivePath);
    this.address = privateKey.toAddress(this.network).toString();
    this.receive[this.address] = privateKey;
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
    this.change[this.changeAddress] = privateKey;
    this.changeIndex += 1;
    return this.changeAddress;
  }
}
