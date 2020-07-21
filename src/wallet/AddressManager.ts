import bitcore from 'bitcore-lib-cash';
import { Network } from 'custom-types';

export class AddressManager {
  constructor(HDWallet: bitcore.HDPrivateKey, network: Network) {
    this.HDWallet = HDWallet;
    this.network = network;
  }

  private HDWallet: bitcore.HDPrivateKey;

  network: Network;

  get all(): Record<string, bitcore.PrivateKey> {
    return { ...this.receive, ...this.change };
  }

  receive: Record<string, bitcore.PrivateKey> = {};

  /**
   * Derives a new receive address. Sets related instance properties.
   */
  receiveAddress = {
    counter: 0,
    current: {},
    next: (): string => {
      const { address, privateKey } = this.deriveAddress('receive', this.receiveAddress.counter);
      this.receiveAddress.current = { address, privateKey };
      this.receive[address] = privateKey;
      this.receiveAddress.counter += 1;
      return address;
    },
    advance(n: number): string {
      this.counter = n;
      this.next();
    },
  };

  change: Record<string, bitcore.PrivateKey> = {};

  /**
   * Derives a new change address. Sets related instance properties.
   */
  changeAddress = {
    counter: 0,
    current: {},
    next: (): string => {
      const { address, privateKey } = this.deriveAddress('change', this.changeAddress.counter);
      this.change[this.changeAddress] = privateKey;
      this.changeAddress.counter += 1;
      return address;
    },
    advance(n: number): string {
      this.counter = n;
      // no call to next() here because composeTx will call it when it needs to.
    },
  };

  deriveAddress(
    deriveType: 'receive' | 'change',
    index: number
  ): { address: string; privateKey: bitcore.HDPrivateKey } {
    const dType = deriveType === 'receive' ? 0 : 1;
    const { privateKey } = this.HDWallet.deriveChild(`m/44'/972/0'/${dType}'/${index}'`);
    return {
      address: privateKey.toAddress(this.network).toString(),
      privateKey,
    };
  }

  getAddresses(n: number, deriveType: 'receive' | 'change', offset = 0) {
    return [...Array(n).keys()].map((i) => {
      const index = i + offset;
      const { address, privateKey } = this.deriveAddress(deriveType, index);
      return {
        index,
        address,
        privateKey,
      };
    });
  }
}
