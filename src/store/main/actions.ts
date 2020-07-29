import { ActionTree } from 'vuex';
import { LocalStorage } from 'quasar';
import { StoreInterface } from '../index';
import { MainStateInterface } from './state';
import { SelectedNetwork } from '../../../types/custom-types';

const localSavedNetworkVar = 'kaspa-network'; // name of key for saving network in local storage

const actions: ActionTree<MainStateInterface, StoreInterface> = {
  // eslint-disable-next-line
  async getWalletInfo({ commit }, wallet: any) {
    const network = LocalStorage.getItem(localSavedNetworkVar);
    if (network) {
      // Use saved network
      const networkName = (network as SelectedNetwork).name;
      wallet.network = networkName; // eslint-disable-line
      await wallet.updateNetwork(networkName); // eslint-disable-line
      commit('setWalletInfo', wallet);
    } else {
      // Use default network
      await wallet.addressDiscovery(); // eslint-disable-line
      commit('setWalletInfo', wallet);
    }
  },

  async setNetwork({ commit, state }, network: SelectedNetwork) {
    LocalStorage.set(localSavedNetworkVar, network);
    const { wallet } = state; // eslint-disable-line
    wallet.network = network.name; // eslint-disable-line
    await wallet.updateNetwork(network.name); // eslint-disable-line
    commit('setWalletInfo', wallet);
  },
};

export default actions;
