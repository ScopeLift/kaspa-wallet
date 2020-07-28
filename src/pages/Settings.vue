<template>
  <q-page padding class="page-margin" data-cy="wallet-receive">
    <div class="row justify-between q-mx-md" data-cy="settings">
      <div class="text-h6 col-xs-12">Change Network</div>
      <q-select
        v-model="selectedNetwork"
        class="col-xs-12"
        label="Standard"
        :options="networkOptions"
        option-label="description"
        @input="updateNetwork"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import helpers from 'src/utils/mixin-helpers';
import { NETWORK_OPTIONS } from '../../config.json';
import { NetworkArray } from '../../types/custom-types';

export default Vue.extend({
  name: 'Settings',

  mixins: [helpers],

  data() {
    return {
      /* eslint-disable */
      selectedNetwork: NETWORK_OPTIONS.filter(
        (network) => network.name === this.$store.state.main.wallet.network
      )[0],
      networkOptions: NETWORK_OPTIONS as NetworkArray,
      /* eslint-disable */
    };
  },

  methods: {
    updateNetwork() {
      console.log('new network', this.selectedNetwork);
      this.$store.dispatch('main/setNetwork', this.selectedNetwork);
    },
  },
});
</script>
