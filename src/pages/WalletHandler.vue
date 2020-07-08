<template>
  <!-- <component :is="pageToShow" /> -->
  <div>
    {{ pageToShow }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Module, VuexModule, getModule } from 'vuex-module-decorators';
import state from 'src/store/modules/main';
import WalletCreate from 'pages/WalletCreate.vue';
import WalletOpen from 'pages/WalletOpen.vue';

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    WalletCreate,
    WalletOpen,
  },
})
export default class WalletHandler extends Vue {
  get hasWallet() {
    return state.hasWallet;
  }

  get pageToShow() {
    return this.hasWallet ? 'WalletOpen' : 'WalletCreate';
  }
}
</script>
