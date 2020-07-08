<template>
  <component :is="pageToShow" />
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import Component from 'vue-class-component';
import WalletCreate from 'pages/WalletCreate.vue';
import WalletOpen from 'pages/WalletOpen.vue';

@Component({
  components: {
    WalletCreate,
    WalletOpen,
  },

  computed: {
    // We use ts-ignore because state is of type unknown
    ...mapState('main', {
      // @ts-ignore
      hasWallet: (state) => Boolean(state.hasWallet),
    }),
  },
})
export default class WalletHandler extends Vue {
  // See comment below for why the duplicate definition is needed
  // https://github.com/vuejs/vue-class-component/issues/109#issuecomment-447201746
  hasWallet!: boolean;

  get pageToShow() {
    return this.hasWallet ? 'WalletOpen' : 'WalletCreate';
  }
}
</script>
