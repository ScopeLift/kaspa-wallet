import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from 'src/store';

export interface IMainState {
  hasWallet: boolean;
}

@Module({ dynamic: true, store, name: 'main' })
class Main extends VuexModule implements IMainState {
  hasWallet = false;
}

export default getModule(Main);
