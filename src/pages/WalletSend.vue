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

  computed: {
    areInputsValid(): boolean {
      return this.toAddress.length > 0 && this.amount.length > 0;
    },
  },

  methods: {
    async next() {
      // const res = await this.$store.main.wallet.sendTx({
      //   amount: this.amount,
      //   toAddr: this.toAddress,
      // });
      // alert(`response: ${res}`);
    },
  },
});
</script>
