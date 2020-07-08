import { MutationTree } from 'vuex';
import { MainInterface } from './state';

const mutation: MutationTree<MainInterface> = {
  setHasWallet(state: MainInterface, hasWallet: boolean) {
    state.hasWallet = hasWallet;
  },
};

export default mutation;
