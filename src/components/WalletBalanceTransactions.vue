<template>
  <div>
    TODO transaction table here
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { StoreInterface } from 'src/store/index';

export default Vue.extend({
  name: 'WalletBalanceValue',

  computed: {
    ...mapState({
      balance(state: StoreInterface) {
        return state.main.balance;
      },
    }),
  },

  data() {
    return {};
  },
});
</script>
