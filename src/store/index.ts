import Vue from 'vue';
import Vuex from 'vuex';
import { IMainState } from './modules/main';

Vue.use(Vuex);

export interface IRootState {
  main: IMainState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
