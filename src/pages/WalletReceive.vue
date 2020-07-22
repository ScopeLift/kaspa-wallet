<template>
  <q-page padding class="page-margin">
    <div class="text-accent text-center text-wrap q-mx-md">
      {{ address }}
      <base-button
        class="q-mt-lg"
        :flat="true"
        label="Copy Receive Address"
        @click="copyAddressToClipboard"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { copyToClipboard } from 'quasar';
// @ts-ignore
import helpers from 'src/utils/mixin-helpers';

export default Vue.extend({
  name: 'WalletReceive',

  mixins: [helpers],

  computed: {
    /* eslint-disable */
    ...mapState({
      address(state): string {
        // @ts-ignore
        return state.main.wallet.receiveAddress;
      },
    }),
    /* eslint-enable */
  },

  methods: {
    copyToClipboard,

    async copyAddressToClipboard() {
      await this.copyToClipboard(this.address);
      // @ts-ignore
      this.notifyUser('positive', 'Address has been copied to the clipboard'); // eslint-disable-line
    },
  },
});
</script>
