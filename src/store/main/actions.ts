import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainStateInterface } from './state';

const actions: ActionTree<MainStateInterface, StoreInterface> = {
  getWalletInfo({ commit }, mnemonic: string) {
    const walletInfo: MainStateInterface = {
      hasWallet: true,
      mnemonic,
      balance: '123456.78901237',
      transactions: [],
    };
    commit('setWalletInfo', walletInfo);
  },
};

export default actions;
