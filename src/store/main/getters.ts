import { GetterTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainInterface } from './state';

const getters: GetterTree<MainInterface, StoreInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
