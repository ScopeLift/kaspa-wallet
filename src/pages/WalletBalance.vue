<template>
  <q-page padding class="page-margin">
    <!-- Wallet balance -->
    <div class="text-primary text-center">
      <transaction-amount :amount="balance" :is-balance="true" />
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
import { mapState } from 'vuex';
import { StoreInterface } from 'src/store/index';
import TransactionAmount from 'components/TransactionAmount.vue';
import WalletBalanceTransactions from 'components/WalletBalanceTransactions.vue';

export default Vue.extend({
  name: 'WalletBalance',

  components: {
    TransactionAmount,
    WalletBalanceTransactions,
  },

  computed: {
    ...mapState({
      balance(state: StoreInterface) {
        return state.main.wallet.balance || '0';
      },
    }),
  },
});
</script>
