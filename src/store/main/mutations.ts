import { MutationTree } from 'vuex';
import Wallet from 'wallet/Wallet';
import { MainStateInterface } from './state';

const mutation: MutationTree<MainStateInterface> = {
  hasWallet(state: MainStateInterface, hasWallet: boolean) {
    state.hasWallet = hasWallet;
  },

  setWalletInfo(state: MainStateInterface, wallet: Wallet) {
    state.wallet = wallet;
  },
};

export default mutation;
