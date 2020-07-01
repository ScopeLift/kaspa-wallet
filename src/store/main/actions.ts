import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainStateInterface } from './state';

const actions: ActionTree<MainStateInterface, StoreInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
