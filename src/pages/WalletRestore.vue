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
              v-model="seedFile"
              accept=".dag"
              outlined
              hint="File must have a .dag extension"
              label="Select File"
              style="min-width: 275px;"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <base-input
              v-if="seedFile"
              v-model="password"
              class="q-mt-lg"
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
          <q-form @submit="restoreFromSeed">
            <p>
              Enter your 12 word seed phrase, with a space between each word. Be sure you're doing
              this in a private space. Anyone with these 12 words can steal your funds.
            </p>
            <base-input
              v-model="seedPhrase"
              :autogrow="true"
              hint="Enter the your 12 word seed phrase"
              label="Seed Phrase"
              style="min-width: 275px;"
            />

            <base-input
              v-if="seedPhrase"
              v-model="password"
              class="q-mt-lg"
              hint="Enter a password to protect this phrase"
              :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              label="Password"
              :type="isPasswordVisible ? 'text' : 'password'"
              @iconClicked="isPasswordVisible = !isPasswordVisible"
            />

            <div class="row justify-end q-mt-lg">
              <base-button
                class="col-auto"
                color="primary"
                :disabled="!isReadyToRestoreFromSeed"
                label="Restore Wallet"
                :loading="isLoading"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Wallet from 'src/wallet/Wallet';
import helpers from 'src/utils/mixin-helpers';
import { LocalStorage } from 'quasar';

export default Vue.extend({
  name: 'RestoreWallet',

  mixins: [helpers],

  data() {
    return {
      // Generic
      showFileRestore: false,
      showSeedRestore: false,
      isPasswordVisible: false,
      isLoading: false,
      password: '',
      // For file upload
      seedFile: undefined,
      // For seed phrase
      seedPhrase: '',
    };
  },

  computed: {
    isReadyToDecrypt(): boolean {
      return Boolean(this.seedFile && this.password);
    },

    isReadyToRestoreFromSeed(): boolean {
      return Boolean(this.seedPhrase && this.password);
    },
  },

  methods: {
    readFile() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        // @ts-ignore
        reader.readAsText(this.seedFile);
      });
    },

    async decryptFile() {
      try {
        this.isLoading = true;
        const seedFileText = await this.readFile();
        const wallet = await Wallet.import(this.password, seedFileText); // eslint-disable-line
        // Save this info into local storage for later
        LocalStorage.set('kaspa-wallet-data', String(seedFileText));
        // Since it was imported from a file, we know it's already backed up
        LocalStorage.set('is-backed-up', true);
        await this.$store.dispatch('main/getWalletInfo', wallet);
        await this.$router.push({ name: 'walletBalance' });
      } catch (err) {
        this.isLoading = false;
        // @ts-ignore
        this.showError(err); // eslint-disable-line
      }
    },

    async restoreFromSeed() {
      try {
        this.isLoading = true;
        const wallet = Wallet.fromMnemonic(this.seedPhrase); // eslint-disable-line
        const encryptedMnemonic = await wallet.export(this.password); // eslint-disable-line
        // Save this info into local storage for later
        LocalStorage.set('kaspa-wallet-data', encryptedMnemonic);
        // Since the phrase already exists, we know it's already backed up
        LocalStorage.set('is-backed-up', true);
        await this.$store.dispatch('main/getWalletInfo', wallet);
        await this.$router.push({ name: 'walletBalance' });
      } catch (err) {
        this.isLoading = false;
        // @ts-ignore
        this.showError(err); // eslint-disable-line
      }
    },
  },
});
</script>