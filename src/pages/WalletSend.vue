<template>
  <q-page padding class="page-margin">
    <div class="text-primary text-center">
      <q-form ref="form" @submit="sendTransaction">
        <base-input v-model="toAddress" label="Recipient Kaspa Address" />
        <base-input v-model="amount" label="Amount in KAS" />
        <base-button :disabled="!areInputsValid" label="Next" type="submit" />
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
// @ts-ignore
import formatters from 'src/utils/mixin-formatters';

export default Vue.extend({
  name: 'WalletSend',

  mixins: [formatters],

  data() {
    return {
      toAddress: '',
      amount: '',
    };
  },

  /* eslint-disable */
  computed: {
    ...mapState({
      wallet(state) {
        // @ts-ignore
        return state.main.wallet;
      },
    }),
    /* eslint-enable */

    areInputsValid(): boolean {
      return this.toAddress.length > 0 && this.amount.length > 0;
    },
  },

  methods: {
    async sendTransaction() {
      // eslint-disable-next-line
      const response = await this.wallet.sendTx({
        toAddr: this.toAddress,
        // @ts-ignore
        amount: this.formatBalanceForMachine(this.amount), // eslint-disable-line
      });
      console.log('response:', response);
    },
  },
});
</script>
