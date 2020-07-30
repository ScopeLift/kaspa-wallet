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
    return { ...this.receiveAddress.keypairs, ...this.changeAddress.keypairs };
  }

  get shouldFetch(): string[] {
    const receive = Object.entries(this.receiveAddress.atIndex)
      .filter(
        (record: [string, string]) => parseInt(record[0], 10) <= this.receiveAddress.counter - 1
      )
      .map((record: [string, string]) => record[1]);
    const change = Object.entries(this.changeAddress.atIndex)
      .filter((record: [string, string]) => parseInt(record[0], 10) <= this.changeAddress.counter)
      .map((record: [string, string]) => record[1]);
    return [...receive, ...change];
  }

  /**
   * Derives a new receive address. Sets related instance properties.
   */
  receiveAddress: {
    counter: number;
    current: { address: string; privateKey: bitcore.PrivateKey };
    keypairs: Record<string, bitcore.PrivateKey>;
    atIndex: Record<string, string>;
    next: () => string;
    advance: (n: number) => void;
  } = {
    counter: 0,
    // @ts-ignore
    current: {},
    keypairs: {},
    atIndex: {},
    next: (): string => {
      const { address, privateKey } = this.deriveAddress('receive', this.receiveAddress.counter);
      this.receiveAddress.current = { address, privateKey };
      this.receiveAddress.keypairs[address] = privateKey;
      this.receiveAddress.atIndex[this.receiveAddress.counter] = address;
      this.receiveAddress.counter += 1;
      return address;
    },
    advance(n: number): void {
      this.counter = n;
      this.next();
    },
  };

  /**
   * Derives a new change address. Sets related instance properties.
   */
  changeAddress: {
    counter: number;
    current: { address: string; privateKey: bitcore.PrivateKey };
    keypairs: Record<string, bitcore.PrivateKey>;
    atIndex: Record<string, string>;
    next: () => string;
    advance: (n: number) => void;
    reverse: () => void;
  } = {
    counter: 0,
    // @ts-ignore
    current: {},
    keypairs: {},
    atIndex: {},
    next: (): string => {
      const { address, privateKey } = this.deriveAddress('change', this.changeAddress.counter);
      this.changeAddress.keypairs[address] = privateKey;
      this.changeAddress.current = { address, privateKey };
      this.changeAddress.atIndex[this.changeAddress.counter] = address;
      this.changeAddress.counter += 1;
      return address;
    },
    advance(n: number): void {
      this.counter = n;
      // no call to next() here; composeTx calls it on demand.
    },
    reverse(): void {
      this.counter -= 1;
    },
  };

  private deriveAddress(
    deriveType: 'receive' | 'change',
    index: number
  ): { address: string; privateKey: bitcore.PrivateKey } {
    const dType = deriveType === 'receive' ? 0 : 1;
    const { privateKey } = this.HDWallet.deriveChild(`m/44'/972/0'/${dType}'/${index}'`);
    return {
      address: privateKey.toAddress(this.network).toString(),
      privateKey,
    };
  }

  /**
   * Derives n addresses and adds their keypairs to their deriveType-respective address object
   * @param n How many addresses to derive
   * @param deriveType receive or change address
   * @param offset Index to start at in derive path
   */
  getAddresses(n: number, deriveType: 'receive' | 'change', offset = 0) {
    return [...Array(n).keys()].map((i) => {
      const index = i + offset;
      const { address, privateKey } = this.deriveAddress(deriveType, index);
      if (deriveType === 'receive') {
        this.receiveAddress.atIndex[index] = address;
        this.receiveAddress.keypairs[address] = privateKey;
      } else {
        this.changeAddress.atIndex[index] = address;
        this.changeAddress.keypairs[address] = privateKey;
      }
      return {
        index,
        address,
        privateKey,
      };
    });
  }
}
