export interface MainStateInterface {
  hasWallet: boolean;
  wallet: any; // eslint-disable-line
  uniqueId: string;
}

const state: MainStateInterface = {
  hasWallet: true,
  wallet: undefined,
  uniqueId: '',
};

export default state;
