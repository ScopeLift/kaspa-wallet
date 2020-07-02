import Wallet from 'src/wallet/Wallet';
import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainStateInterface } from './state';

const actions: ActionTree<MainStateInterface, StoreInterface> = {
  getWalletInfo({ commit }, wallet: Wallet) {
    commit('setWalletInfo', wallet);
  },
};

export default actions;
