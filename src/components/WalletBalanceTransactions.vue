<template>
  <div>
    <q-table
      :columns="columns"
      :data="sortedTransactions"
      data-cy="wallet-balance-transactions"
      flat
      hide-header
      :hide-pagination="false"
      row-key="name"
    >
      <!-- Confirmations column -->
      <template
        v-slot:body-cell-confirmations="props"
        data-cy="wallet-balance-transactions-confirmationsCol"
      >
        <q-td :props="props" style="padding-left: 0 !important; padding-right: 0 !important;">
          <div class="text-darkestgrey">
            <q-circular-progress
              :value="getConfirmationRatio(props.row.confirmations)"
              size="40px"
              :color="getConfirmationColor(props.row.confirmations)"
              class="q-ma-md"
              data-cy="wallet-balance-transactions-confirmationsCircle"
              show-value
              style="margin-left: 0 !important;"
              :thickness="0.1"
            >
              <span
                class="font-smaller-1"
                data-cy="wallet-balance-transactions-confirmationsCount"
                >{{ props.row.confirmations }}</span
              >
            </q-circular-progress>
          </div>
        </q-td>
      </template>

      <!-- Status column -->
      <template v-slot:body-cell-status="props" data-cy="wallet-balance-transactions-statusCol">
        <q-td :props="props">
          <div class="text-darkestgrey" data-cy="wallet-balance-transactions-statusDirAndAddr">
            <!-- Show arrow based on incoming or outgoing -->
            <span v-if="props.row.summary.direction === 'out'">
              <q-icon class="q-mr-xs" color="negative" name="fas fa-arrow-right" />
            </span>
            <span v-else>
              <q-icon class="q-mr-xs" color="primary" name="fas fa-arrow-left" />
            </span>
            {{ partialAddress(props.row.summary.address) }}
          </div>
          <div class="text-grey text-caption" data-cy="wallet-balance-transactions-statusText">
            <span v-if="props.row.confirmations === 0">In progress...</span>
            <span v-else>Confirmations: {{ props.row.confirmations }}</span>
          </div>
        </q-td>
      </template>

      <!-- Amount column -->
      <template v-slot:body-cell-amount="props" data-cy="wallet-balance-transactions-amountCol">
        <q-td :props="props">
          <div class="text-darkestgrey">
            <transaction-amount
              :amount="getValue(props.row.summary)"
              data-cy="wallet-balance-transactions-amountCol-amount"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import TransactionAmount from 'components/TransactionAmount.vue';
// @ts-ignore
import { partialAddress } from 'src/utils/formatters';
// @ts-ignore
import { Transaction } from '../../types/custom-types';

interface txSummary {
  value: number;
  direction: string;
  timestamp: number;
  address: string;
}

export default Vue.extend({
  name: 'WalletBalanceTransactions',

  components: {
    TransactionAmount,
  },

  data() {
    return {
      columns: [
        {
          align: 'left',
          field: 'confirmations',
          label: 'Confirmations',
          name: 'confirmations',
          sortable: true,
        },
        {
          align: 'left',
          field: 'outputs',
          label: 'Status',
          name: 'status',
          sortable: true,
        },
        {
          align: 'right',
          field: 'outputs',
          label: 'Amount',
          name: 'amount',
          sortable: true,
        },
      ],
    };
  },

  computed: {
    /* eslint-disable */
    ...mapState({
      balance(state): string {
        // @ts-ignore
        return state.main.wallet.balance;
      },
      transactions(state): Array<Transaction> {
        // @ts-ignore
        return state.main.wallet.transactions;
      },
    }),
    /* eslint-enable */

    /**
     * @notice Returns confirmations sorted by number of confirmations, lowers first
     */
    sortedTransactions() {
      // eslint-disable-next-line
      return this.transactions.sort((a, b) => a.confirmations - b.confirmations);
    },
  },

  methods: {
    partialAddress, // eslint-disable-line

    getConfirmationRatio(numConfirmations: number) {
      const maxVal = 400; // 400 confirmations = 100% confirmation
      const fraction = (100 * numConfirmations) / maxVal;
      const value = fraction > 100 ? 100 : fraction;
      return value;
    },

    getConfirmationColor(numConfirmations: number) {
      // @ts-ignore
      const confirmationRatio = Number(this.getConfirmationRatio(numConfirmations)); // eslint-disable-line @typescript-eslint/no-unsafe-call
      if (confirmationRatio >= 75) return 'positive';
      if (confirmationRatio < 75 && confirmationRatio >= 25) return 'warning';
      if (confirmationRatio < 25) return 'negative';
      return 'negative';
    },

    getValue(summary: txSummary) {
      const amount = summary.value / 1e8;
      const scale = summary.direction === 'in' ? 1 : -1;
      return String(amount * scale);
    },
  },
});
</script>
