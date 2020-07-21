<template>
  <q-page padding class="page-margin">
    <!-- Wallet backup prompt -->
    <wallet-backup-prompt v-if="!isBackedUp" @backupComplete="getBackupStatus" />
    <!-- Wallet balance -->
    <div class="text-primary text-center">
      <transaction-amount :amount="formatBalanceForHuman(balance)" :is-balance="true" />
    </div>
    <!-- Transaction history -->
    <div class="text-primary text-left">
      <h4 class="text-left q-mb-none">Transaction History</h4>
      <wallet-balance-transactions />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import TransactionAmount from 'components/TransactionAmount.vue';
import WalletBalanceTransactions from 'components/WalletBalanceTransactions.vue';
import formatters from 'src/utils/mixin-formatters';

export default Vue.extend({
  name: 'WalletBalance',

  mixins: [formatters],

  components: {
    TransactionAmount,
    WalletBalanceTransactions,
  },

  data() {
    return {
      isBackedUp: true,
    };
  },

  computed: {
    /* eslint-disable */
    ...mapState({
      balance(state) {
        // @ts-ignore
        return state.main.wallet.balance || '0';
      },
      wallet(state) {
        // @ts-ignore
        return state.main.wallet;
      },
    }),
    /* eslint-enable */
  },

  async mounted() {
    this.getBackupStatus();
    /* eslint-disable-next-line */
    await this.wallet.addressDiscovery();
  },

  methods: {
    getBackupStatus() {
      this.isBackedUp = Boolean(this.$q.localStorage.getItem('is-backed-up'));
    },
  },
});
</script>
