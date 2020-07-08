import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import main from './main';
import { MainInterface } from './main/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StoreInterface {
  // Define your own store structure, using submodules if needed
  main: MainInterface;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StoreInterface>({
    modules: {
      main,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: !!process.env.DEV,
  });

  return Store;
});
