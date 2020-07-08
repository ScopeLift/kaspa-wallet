import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainInterface } from './state';

const actions: ActionTree<MainInterface, StoreInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
