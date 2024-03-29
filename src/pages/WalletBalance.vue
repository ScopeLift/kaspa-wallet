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
    <!-- <base-button
      class="text-center"
      :flat="true"
      :dense="true"
      data-cy="wallet-refresh-data"
      label="Refresh data"
      :loading="isLoading"
      @click="refreshState"
    /> -->
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
        <div class="row justify-between items-center">
          <h4 class="col-auto text-left q-mb-none q-mt-lg">Transaction History</h4>
          <q-icon
            v-if="!isLoading"
            class="col-auto q-mt-lg cursor-pointer"
            name="refresh"
            size="1.5em"
            @click="refreshState"
          />
          <q-spinner v-else size="1.5em" class="col-auto q-mt-lg" />
        </div>
        <wallet-balance-transactions />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { LocalStorage } from 'quasar';
import TransactionAmount from 'components/TransactionAmount.vue';
import WalletBalanceTransactions from 'components/WalletBalanceTransactions.vue';
// @ts-ignore
import formatters from 'src/utils/mixin-formatters';
// @ts-ignore
import helpers from 'src/utils/mixin-helpers';

export default Vue.extend({
  name: 'WalletBalance',

  components: {
    TransactionAmount,
    WalletBalanceTransactions,
  },

  mixins: [formatters, helpers],

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
      uniqueId(state) {
        // @ts-ignore
        return state.main.uniqueId;
      },
    }),
    /* eslint-enable */
  },

  async mounted() {
    this.getBackupStatus();
    await this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.isLoading = true;
        const cache = LocalStorage.getItem(`kaspa-cache-${this.uniqueId}`); // eslint-disable-line
        if (
          cache &&
          // @ts-ignore
          (cache.addresses.receiveCounter !== 0 || cache.addresses.changeCounter !== 0) // eslint-disable-line
        ) {
          await this.refreshState();
          this.isLoading = false;
        } else {
          await this.wallet.addressDiscovery(); // eslint-disable-line
          this.$store.commit('main/setWalletInfo', this.wallet);
          this.isLoading = false;
        }
      } catch (err) {
        this.isLoading = false;
        // @ts-ignore
        this.showError(err); // eslint-disable-line
      }
    },

    async refreshState() {
      try {
        this.isLoading = true;
        /* eslint-disable */
        if (this.wallet.addressManager.shouldFetch.length === 0) {
          await this.wallet.addressDiscovery();
        } else {
          await this.wallet.updateState();
        }
        /* eslint-enable */
        this.$store.commit('main/setWalletInfo', this.wallet);
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        // @ts-ignore
        this.showError(err); // eslint-disable-line
      }
    },

    getBackupStatus() {
      this.isBackedUp = Boolean(this.$q.localStorage.getItem('is-backed-up'));
    },
  },
});
</script>
