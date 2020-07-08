import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainStateInterface } from './state';

const actions: ActionTree<MainStateInterface, StoreInterface> = {
  // eslint-disable-next-line
  getWalletInfo({ commit }, wallet: any) {
    commit('setWalletInfo', wallet);
  },
};

export default actions;
