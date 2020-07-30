<template>
  <q-page padding class="page-margin" data-cy="wallet-send">
    <div class="text-primary text-center">
      <q-form ref="form" data-cy="wallet-send-form" @submit="sendTransaction">
        <base-input
          v-model="toAddress"
          data-cy="wallet-send-form-toInput"
          label="Recipient Kaspa Address"
        />
        <base-input v-model="amount" data-cy="wallet-send-form-amountInput" label="Amount in KAS" />
        <base-button
          :disabled="!areInputsValid"
          data-cy="wallet-send-form-sendBtn"
          label="Send"
          type="submit"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
// @ts-ignore
import formatters from 'src/utils/mixin-formatters';
// @ts-ignore
import helpers from 'src/utils/mixin-helpers';

export default Vue.extend({
  name: 'WalletSend',

  mixins: [formatters, helpers],

  data() {
    return {
      toAddress: '',
      amount: '',
      isLoading: false,
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
      try {
        this.isLoading = true;
        // eslint-disable-next-line
        const response = await this.wallet.sendTx({
          toAddr: this.toAddress,
          // @ts-ignore
          amount: this.formatBalanceForMachine(this.amount), // eslint-disable-line
        });
        // @ts-ignore
        this.notifyUser('positive', 'Your transaction has been sent!'); // eslint-disable-line
        console.log('transactionId:', response);
        await this.$router.push({ name: 'walletBalance' });
      } catch (err) {
        // @ts-ignore
        this!.showError(err); // eslint-disable-line
        this.isLoading = false;
      }
    },
  },
});
</script>
