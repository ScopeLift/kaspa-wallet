<template>
  <div>
    <q-table
      :columns="columns"
      :data="transactions"
      flat
      hide-header
      :hide-pagination="false"
      row-key="name"
    >
      <!-- Confirmations column -->
      <template v-slot:body-cell-confirmations="props">
        <q-td :props="props" style="padding-left: 0 !important; padding-right: 0 !important;">
          <div class="text-darkestgrey">
            <q-circular-progress
              :value="75"
              size="40px"
              color="positive"
              class="q-ma-md"
              show-value
              style="margin-left: 0 !important;"
              :thickness="0.1"
            >
              <span class="font-smaller-1">{{ props.row.confirmations }}</span>
            </q-circular-progress>
          </div>
        </q-td>
      </template>

      <!-- Status column -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div class="text-darkestgrey">
            <!-- Show arrow based on incoming or outgoing -->
            <span v-if="props.row.direction === 'out'">
              <q-icon class="q-mr-xs" color="negative" name="fas fa-arrow-right" />
            </span>
            <span v-else>
              <q-icon class="q-mr-xs" color="primary" name="fas fa-arrow-left" />
            </span>
            {{ partialAddress(props.row.outputs[0].address) }}
          </div>
          <div class="text-grey text-caption">
            <span v-if="props.row.confirmations === 0">In progress...</span>
            <span v-else>Confirmations: {{ props.row.confirmations }}</span>
          </div>
        </q-td>
      </template>

      <!-- Amount column -->
      <template v-slot:body-cell-amount="props">
        <q-td :props="props">
          <div class="text-darkestgrey">
            <transaction-amount amount="-14.34780000" />
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
import { partialAddress } from 'src/utils/formatters';
import { Transaction } from '../../types/custom-types';

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
  },

  methods: {
    partialAddress, // eslint-disable-line
  },
});
</script>
