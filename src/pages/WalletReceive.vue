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
import { StoreInterface } from 'src/store/index';
import { copyToClipboard } from 'quasar';
import helpers from 'src/utils/mixin-helpers';

export default Vue.extend({
  name: 'WalletReceive',

  mixins: [helpers],

  computed: {
    ...mapState({
      address(state: StoreInterface): string {
        return state.main.address;
      },
    }),
  },

  methods: {
    copyToClipboard,

    async copyAddressToClipboard() {
      await this.copyToClipboard(this.address);
      this.notifyUser('positive', 'Address has been copied to the clipboard'); // eslint-disable-line
    },
  },
});
</script>
