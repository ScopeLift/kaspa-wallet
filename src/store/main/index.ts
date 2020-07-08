import { Module } from 'vuex';
import { StoreInterface } from '../index';
import state, { MainInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const exampleModule: Module<MainInterface, StoreInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default exampleModule;
