import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainStateInterface } from './state';
import { SelectedNetwork } from '../../../types/custom-types';

const actions: ActionTree<MainStateInterface, StoreInterface> = {
  // eslint-disable-next-line
  async getWalletInfo({ commit }, wallet: any) {
    await wallet.addressDiscovery(); // eslint-disable-line
    commit('setWalletInfo', wallet);
  },

  async setNetwork({ commit, state }, network: SelectedNetwork) {
    const { wallet } = state; // eslint-disable-line
    wallet.network = network.name; // eslint-disable-line
    await wallet.updateNetwork(network.name); // eslint-disable-line
    commit('setWalletInfo', wallet);
  },
};

export default actions;
