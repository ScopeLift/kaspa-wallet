export interface MainStateInterface {
  hasWallet: boolean;
  wallet: any; // eslint-disable-line
}

const state: MainStateInterface = {
  hasWallet: true,
  wallet: undefined,
};

export default state;
