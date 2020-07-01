import { MutationTree } from 'vuex';
import { MainStateInterface } from './state';

const mutation: MutationTree<MainStateInterface> = {
  hasWallet(state: MainStateInterface, hasWallet: boolean) {
    state.hasWallet = hasWallet;
  },
};

export default mutation;
