import { GetterTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainStateInterface } from './state';

const getters: GetterTree<MainStateInterface, StoreInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
