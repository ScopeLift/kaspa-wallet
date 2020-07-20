<template>
  <q-page padding class="page-margin">
    <div class="text-primary text-center">
      <base-input v-model="toAddress" label="Recipient Kaspa Address" />
      <base-input v-model="amount" label="Amount in KAS" />
      <base-button :disabled="!areInputsValid" label="Next" @click="next" />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WalletSend',

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
    next() {
      alert(`Sending ${this.amount} KAS to ${this.toAddress}`);
    },
  },
});
</script>
