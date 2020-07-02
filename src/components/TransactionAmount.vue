<template>
  <div>
    <span v-if="isBalance" class="text-caption text-secondary q-mr-sm">$KSP</span>
    <span class="text-accent" :class="[isBalance ? 'font-bigger-4' : 'font-bigger-2']">{{
      preDecimal
    }}</span>
    <span class="text-secondary" :class="[isBalance ? 'font-bigger-4' : 'font-bigger-2']"
      >.{{ postDecimal1 }}</span
    >
    <span class="text-secondary" :class="[isBalance ? 'font-bigger-3' : 'font-bigger-1']">{{
      postDecimal2
    }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WalletBalanceValue',

  props: {
    amount: {
      type: String,
      required: true,
    },

    isBalance: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {};
  },

  computed: {
    formattedBalance(): string {
      return (+this.amount).toLocaleString(undefined, {
        minimumFractionDigits: 8,
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
});
</script>

<style lang="sass" scoped>
.big1
  font-size: 2rem

.big2
  font-size: 1.5rem

.small1
  font-size: 1.3rem

.small2
  font-size: 1.1rem
</style>
