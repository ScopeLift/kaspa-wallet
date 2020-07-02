<template>
  <q-page padding class="page-margin">
    <!-- Wallet balance -->
    <div class="text-primary text-center">
      <wallet-balance-value />
    </div>
    <!-- Transaction history -->
    <div class="text-primary text-left">
      <h4 class="text-left">Transaction History</h4>
      <wallet-balance-transactions />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import WalletBalanceValue from 'components/WalletBalanceValue.vue';
import WalletBalanceTransactions from 'components/WalletBalanceTransactions.vue';

export default Vue.extend({
  name: 'WalletBalance',

  components: {
    WalletBalanceValue,
    WalletBalanceTransactions,
  },
});
</script>
