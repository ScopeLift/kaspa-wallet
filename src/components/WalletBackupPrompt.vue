<template>
  <div>
    <q-banner class="bg-negative text-white column" :inline-actions="false">
      Your wallet is only accessible from this device. Back it up, take it with you
      <div class="row justify-start q-mt-md">
        <base-button
          :dense="true"
          :flat="true"
          @click="showSeed"
          class="col-auto q-mr-md"
          color="white"
          label="Show Recovery Seed"
        />
        <base-button @click="saveWalletFile" class="col-auto" color="grey" label="Save Wallet" />
      </div>
    </q-banner>

    <q-dialog v-model="showSeedPhrase" class="q-pa-lg">
      <q-card>
        <q-card-section>
          <h6 class="text-center text-primary q-my-none">Recovery</h6>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Below is an ordered 12-word seed phrase, representing this wallet's seed. It's like a
          secret pass phrase. Write it down and keep it safe.
        </q-card-section>

        <q-card-section class="">
          <div class="row justify-between">
            <div
              v-for="(word, index) in seedPhraseArray"
              :key="index"
              class="text-center text-primary col-xs-3 q-mt-md"
            >
              <div>
                {{ word }}
              </div>
              <div class="text-grey text-center text-caption">
                {{ index + 1 }}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="text-caption text-grey text-italic">
          Cool fact: there are more 12-word phrase combinations than nanoseconds since the big bang!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { StoreInterface } from 'src/store/index';
import { exportFile } from 'quasar';
import helpers from 'src/utils/mixin-helpers';

export default Vue.extend({
  name: 'WalletBackupPrompt',

  mixins: [helpers],

  data() {
    return {
      showSeedPhrase: false,
    };
  },

  computed: {
    ...mapState({
      seedPhrase(state: StoreInterface) {
        return state.main.wallet.mnemonic;
      },
    }),

    seedPhraseArray(): Array<String> {
      return this.seedPhrase.split(' ');
    },
  },

  methods: {
    showSeed() {
      this.showSeedPhrase = true;
    },

    saveWalletFile() {
      const encryptedMnemonic = this.$q.localStorage.getItem('kaspa-wallet-data');
      const status = exportFile('kaspa-wallet-data.dag', encryptedMnemonic);

      if (!status) {
        // browser denied it
        this.showError('Browser denied file download');
      }
    },
  },
});
</script>
