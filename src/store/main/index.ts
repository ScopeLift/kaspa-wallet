import { Module } from 'vuex';
import { StoreInterface } from '../index';
import state, { MainStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const exampleModule: Module<MainStateInterface, StoreInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default exampleModule;
