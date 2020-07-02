export interface MainStateInterface {
  hasWallet: boolean;
  balance: string;
}

const state: MainStateInterface = {
  hasWallet: true, // default to true to avoid overwriting an existing wallet
  balance: '123456.78901237',
};

export default state;
