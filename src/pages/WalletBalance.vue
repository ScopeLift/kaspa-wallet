<template>
  <q-page padding class="page-margin" data-cy="wallet-balance">
    <!-- Wallet backup prompt -->
    <wallet-backup-prompt v-if="!isBackedUp" @backupComplete="getBackupStatus" />
    <!-- Is loading -->
    <!-- <div v-if="isLoading" data-cy="wallet-balance-loading">
      <div class="row justify-center">
        <q-spinner class="q-my-lg" color="primary" size="3em" />
      </div>
      <div class="text-center text-caption text-grey text-italic">
        Fetching latest wallet data...
      </div>
    </div> -->
    <!-- Wallet balance -->
    <base-button
      class="text-center"
      :flat="true"
      :dense="true"
      data-cy="wallet-refresh-data"
      label="Refresh data"
      :loading="isLoading"
      @click="refreshState"
    />
    <div data-cy="wallet-balance-container">
      <div class="text-primary text-center">
        <transaction-amount
          :amount="formatBalanceForHuman(balance)"
          data-cy="wallet-balance-amount"
          :is-balance="true"
        />
      </div>
      <!-- Transaction history -->
      <div class="text-primary text-left" data-cy="wallet-balance-txHistory">
        <h4 class="text-left q-mb-none">Transaction History</h4>
        <wallet-balance-transactions />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import TransactionAmount from 'components/TransactionAmount.vue';
import WalletBalanceTransactions from 'components/WalletBalanceTransactions.vue';
// @ts-ignore
import formatters from 'src/utils/mixin-formatters';

export default Vue.extend({
  name: 'WalletBalance',

  components: {
    TransactionAmount,
    WalletBalanceTransactions,
  },

  mixins: [formatters],

  data() {
    return {
      isBackedUp: true,
      isLoading: false,
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

  mounted() {
    this.isLoading = true;
    this.getBackupStatus();
    // await this.wallet.updateState(); // eslint-disable-line
    // await this.$store.dispatch('main/getWalletInfo', this.wallet);
    this.isLoading = false;
  },

  methods: {
    async refreshState() {
      this.isLoading = true;
      await this.wallet.updateState(); /* eslint-disable-line */
      this.isLoading = false;
    },
    getBackupStatus() {
      this.isBackedUp = Boolean(this.$q.localStorage.getItem('is-backed-up'));
    },
  },
});
</script>
