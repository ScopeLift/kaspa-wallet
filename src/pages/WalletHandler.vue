<template>
  <component :is="pageToShow" />
</template>

<script lang="ts">
import Vue from 'vue';
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
    /* eslint-disable */
    ...mapState({
      hasWallet(state) {
        // @ts-ignore
        return state.main.hasWallet;
      },
    }),
    /* eslint-enable */

    pageToShow() {
      return this.hasWallet ? 'WalletOpen' : 'WalletCreate';
    },
  },
});
</script>
