import { MutationTree } from 'vuex';
// @ts-ignore
import Wallet from 'wallet/Wallet';
import { LocalStorage } from 'quasar';
import { MainStateInterface } from './state';

const mutation: MutationTree<MainStateInterface> = {
  hasWallet(state: MainStateInterface, hasWallet: boolean) {
    state.hasWallet = hasWallet;
  },

  setWalletInfo(state: MainStateInterface, wallet: Wallet) {
    LocalStorage.set(`kaspa-cache-${String(state.uniqueId)}`, wallet.cache);
    state.wallet = wallet;
  },

  setUniqueId(state: MainStateInterface, uniqueId: string) {
    state.uniqueId = uniqueId;
  },
};

export default mutation;
