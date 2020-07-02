<template>
  <div>
    <span class="text-caption text-secondary q-mr-sm">$KSP</span>
    <span class="biggest text-accent">{{ preDecimal }}</span>
    <span class="biggest text-secondary">.{{ postDecimal1 }}</span>
    <span class="big text-secondary">{{ postDecimal2 }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { StoreInterface } from 'src/store/index';

export default Vue.extend({
  name: 'WalletBalanceValue',

  computed: {
    ...mapState({
      balance(state: StoreInterface) {
        return state.main.balance;
      },
    }),

    formattedBalance(): string {
      return (+this.balance).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
      });
    },

    preDecimal(): string {
      return this.formattedBalance.split('.')[0];
    },

    postDecimal1(): string {
      return this.formattedBalance.split('.')[1].slice(0, 2);
    },

    postDecimal2(): string {
      return this.formattedBalance.split('.')[1].slice(2);
    },
  },

  data() {
    return {};
  },
});
</script>

<style lang="sass" scoped>
.biggest
  font-size: 2rem

.big
  font-size: 1.5rem
</style>
