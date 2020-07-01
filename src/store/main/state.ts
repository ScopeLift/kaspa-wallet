export interface MainStateInterface {
  hasWallet: boolean;
}

const state: MainStateInterface = {
  hasWallet: true, // default to true to avoid overwriting an existing wallet
};

export default state;
