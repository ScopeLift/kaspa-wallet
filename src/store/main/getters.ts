import { GetterTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainStateInterface } from './state';

const getters: GetterTree<MainStateInterface, StoreInterface> = {
  isLoggedIn(state: MainStateInterface): boolean {
    return state.wallet?.mnemonic.split(' ').length === 12;
  },
};

export default getters;
