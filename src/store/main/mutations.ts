import { MutationTree } from 'vuex';
import { MainStateInterface } from './state';

const mutation: MutationTree<MainStateInterface> = {
  hasWallet(state: MainStateInterface, hasWallet: boolean) {
    state.hasWallet = hasWallet;
  },

  setWalletInfo(state: MainStateInterface, walletInfo: MainStateInterface) {
    state.mnemonic = walletInfo.mnemonic;
    state.balance = walletInfo.balance;
    state.transactions = walletInfo.transactions;
  },
};

export default mutation;
