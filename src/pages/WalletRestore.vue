<template>
  <q-page padding class="text-primary text-center page-margin">
    <!-- Home content -->
    <div>
      <p class="text-center">How would you like to restore your wallet?</p>
      <div class="row justify-evenly q-mt-xl">
        <base-button
          class="col-auto"
          :flat="true"
          label="With Seed"
          @click="showSeedRestore = true"
        />
        <base-button
          class="col-auto"
          :flat="true"
          label="With File"
          @click="showFileRestore = true"
        />
      </div>
    </div>

    <!-- Restore from file -->
    <q-dialog v-model="showFileRestore">
      <q-card class="q-px-lg">
        <!-- Header Section -->
        <q-card-section class="row items-center justify-between">
          <q-btn icon="close" flat round dense style="opacity: 0; cursor: default;" />
          <h6 class="text-primary q-my-none">Restore from File</h6>
          <q-btn v-close-popup icon="close" color="primary" flat round dense />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="decryptFile">
            <q-file
              accept=".dag"
              outlined
              v-model="seedFile"
              hint="File must have a .dag extension"
              label="Select File"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <base-input
              v-if="seedFile"
              v-model="password"
              hint="Enter the password for this file"
              :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              label="Password"
              :type="isPasswordVisible ? 'text' : 'password'"
              @iconClicked="isPasswordVisible = !isPasswordVisible"
            />

            <div class="row justify-end q-mt-lg">
              <base-button
                class="col-auto"
                color="primary"
                :disabled="!isReadyToDecrypt"
                label="Restore Wallet"
                :loading="isLoading"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Restore from seed -->
    <q-dialog v-model="showSeedRestore">
      <q-card>
        <!-- Header Section -->
        <q-card-section class="row items-center justify-between">
          <q-btn icon="close" flat round dense style="opacity: 0; cursor: default;" />
          <h6 class="text-primary q-my-none">Restore from Seed</h6>
          <q-btn v-close-popup icon="close" color="primary" flat round dense />
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
          voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
          exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Wallet from 'src/wallet/Wallet';
import helpers from 'src/utils/mixin-helpers';

export default Vue.extend({
  name: 'RestoreWallet',

  mixins: [helpers],

  data() {
    return {
      showFileRestore: false,
      showSeedRestore: false,
      seedFile: undefined,
      isPasswordVisible: false,
      password: undefined,
      seedFileText: undefined,
      isLoading: undefined,
    };
  },

  computed: {
    isReadyToDecrypt() {
      return this.seedFileText && this.password;
    },
  },

  watch: {
    seedFile: {
      async handler() {
        const reader = new FileReader();
        this.seedFileText = await this.readFile(this.seedFile);
      },
    },
  },

  methods: {
    readFile(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      });
    },

    async decryptFile() {
      try {
        this.isLoading = true;
        const wallet = await Wallet.import(this.password, this.seedFileText);
        // Save this info into local storage for later
        this.$q.localStorage.set('kaspa-wallet-data', this.seedFileText);
        // Since it was imported from a file, we know it's already backed up
        this.$q.localStorage.set('is-backed-up', true);
        await this.$store.dispatch('main/getWalletInfo', wallet);
        await this.$router.push({ name: 'walletBalance' });
      } catch (err) {
        this.isLoading = false;
        this.showError(err);
      }
    },
  },
});
</script>
