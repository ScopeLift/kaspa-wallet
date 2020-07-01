<template>
  <component :is="pageToShow" />
</template>

<script lang="ts">
import Vue from 'vue';
import { StoreInterface } from 'src/store/index';
import { mapState } from 'vuex';
import WalletCreate from 'pages/WalletCreate.vue';
import WalletOpen from 'pages/WalletOpen.vue';

export default Vue.extend({
  name: 'WalletHandler',

  components: {
    WalletCreate,
    WalletOpen,
  },

  computed: {
    ...mapState({
      hasWallet(state: StoreInterface) {
        return state.main.hasWallet;
      },
    }),

    pageToShow() {
      return this.hasWallet ? 'WalletOpen' : 'WalletCreate';
    },
  },
});
</script>
