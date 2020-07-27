import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainStateInterface } from './state';

const actions: ActionTree<MainStateInterface, StoreInterface> = {
  // eslint-disable-next-line
  async getWalletInfo({ commit }, wallet: any) {
    await wallet.addressDiscovery(); // eslint-disable-line
    commit('setWalletInfo', wallet);
  },
};

export default actions;
