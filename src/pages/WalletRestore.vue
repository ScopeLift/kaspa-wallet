<template>
  <q-page padding class="text-primary text-center page-margin" data-cy="wallet-restore">
    <!-- Home content -->
    <div data-cy="wallet-restore-container">
      <p class="text-center" data-cy="wallet-restore-text">
        How would you like to restore your wallet?
      </p>
      <div class="row justify-evenly q-mt-xl">
        <base-button
          class="col-auto"
          data-cy="wallet-restore-withSeedBtn"
          :flat="true"
          label="With Seed"
          @click="showSeedRestore = true"
        />
        <base-button
          class="col-auto"
          data-cy="wallet-restore-withFileBtn"
          :flat="true"
          label="With File"
          @click="showFileRestore = true"
        />
      </div>
    </div>

    <!-- Restore from file -->
    <q-dialog v-model="showFileRestore" data-cy="wallet-restore-fileDialog" @hide="reset">
      <q-card class="q-px-lg">
        <!-- Header Section -->
        <q-card-section
          class="row items-center justify-between"
          data-cy="wallet-restore-fileDialog-header"
        >
          <q-btn icon="close" flat round dense style="opacity: 0; cursor: default;" />
          <h6 class="text-primary q-my-none">Restore from File</h6>
          <q-btn v-close-popup icon="close" color="primary" flat round dense />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="form" data-cy="wallet-restore-fileDialog-form" @submit="decryptFile">
            <q-file
              v-model="seedFile"
              accept=".dag"
              data-cy="wallet-restore-fileDialog-form-fileInput"
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
              :autofocus="true"
              class="q-mt-lg"
              data-cy="wallet-restore-fileDialog-pwInput"
              :hint="passwordHint"
              :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              label="Password"
              :rules="checkPasswordRequirements"
              :type="isPasswordVisible ? 'text' : 'password'"
              @iconClicked="isPasswordVisible = !isPasswordVisible"
              @input="resetFormValidations('form')"
            />

            <div class="row justify-end q-mt-lg">
              <base-button
                class="col-auto"
                color="primary"
                data-cy="wallet-restore-fileDialog-form-submitBtn"
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
    <q-dialog v-model="showSeedRestore" data-cy="wallet-restore-seedDialog" @hide="reset">
      <q-card>
        <!-- Header Section -->
        <q-card-section
          class="row items-center justify-between"
          data-cy="wallet-restore-seedDialog-header"
        >
          <q-btn icon="close" flat round dense style="opacity: 0; cursor: default;" />
          <h6 class="text-primary q-my-none">Restore from Seed</h6>
          <q-btn v-close-popup icon="close" color="primary" flat round dense />
        </q-card-section>

        <!-- Get seed phrase -->
        <q-card-section v-if="!isReadyForPassword" class="q-pt-none">
          <q-form
            ref="form"
            data-cy="wallet-restore-seedDialog-phraseForm"
            @submit="continueToPassword"
          >
            <p data-cy="wallet-restore-seedDialog-phraseForm-text">
              Enter your 12 word seed phrase, with a space between each word. Be sure you're doing
              this in a private space. Anyone with these 12 words can steal your funds.
            </p>
            <base-input
              v-model="seedPhrase"
              :autofocus="!isReadyForPassword"
              :autogrow="true"
              data-cy="wallet-restore-seedDialog-phraseForm-seedInput"
              hint="Enter the your 12 word seed phrase"
              label="Seed Phrase"
              :rules="isSeedPhraseValid"
              style="min-width: 275px;"
              @input="resetFormValidations('form')"
            />

            <div class="row justify-end q-mt-lg">
              <base-button
                class="col-auto"
                color="primary"
                data-cy="wallet-restore-seedDialog-phraseForm-seedInputNextBtn"
                label="Next"
                :loading="isLoading"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>

        <!-- Get password -->
        <q-card-section v-else class="q-pt-none">
          <q-form ref="form" data-cy="wallet-restore-seedDialog-pwForm" @submit="restoreFromSeed">
            <p data-cy="wallet-restore-seedDialog-pwForm-text">
              Enter a password to encrypt your seed phrase.
            </p>

            <!-- First password -->
            <base-input
              v-if="seedPhrase"
              v-model="password"
              :autofocus="true"
              class="q-mt-lg"
              data-cy="wallet-restore-seedDialog-pwForm-pw1Input"
              :hint="passwordHint"
              :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              label="Password"
              :type="isPasswordVisible ? 'text' : 'password'"
              :rules="checkPasswordRequirements"
              @iconClicked="isPasswordVisible = !isPasswordVisible"
              @input="resetFormValidations('form')"
            />

            <!-- Confirm password -->
            <base-input
              v-model="password2"
              class="q-mt-lg"
              data-cy="wallet-restore-seedDialog-pwForm-pw2-input"
              :hint="passwordHint"
              :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              label="Confirm Password"
              :type="isPasswordVisible ? 'text' : 'password'"
              :rules="verifyPasswordsMatch(password, password2)"
              @iconClicked="isPasswordVisible = !isPasswordVisible"
              @input="resetFormValidations('form')"
            />

            <div class="row justify-end q-mt-lg">
              <base-button
                class="col-auto"
                color="primary"
                data-cy="wallet-restore-seedDialog-pwForm-submitBtn"
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
// @ts-ignore
import Wallet from 'src/wallet/Wallet';
// @ts-ignore
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
      isReadyForPassword: false,
      password2: '',
    };
  },

  methods: {
    reset() {
      // Generic
      this.showFileRestore = false;
      this.showSeedRestore = false;
      this.isPasswordVisible = false;
      this.isLoading = false;
      this.password = '';
      // For file upload
      this.seedFile = undefined;
      // For seed phrase
      this.seedPhrase = '';
      this.isReadyForPassword = false;
      this.password2 = '';
    },

    isSeedPhraseValid() {
      const seedParts = this.seedPhrase.split(' ');
      const isValid = seedParts.length === 12 && seedParts[11] !== '';
      return isValid || 'Please enter a valid 12 word seed phrase';
    },

    readFile() {
      /* eslint-disable */
      return new Promise((resolve, reject) => {
        // @ts-ignore
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        // @ts-ignore
        reader.readAsText(this.seedFile);
      });
      /* eslint-enable */
    },

    async decryptFile() {
      try {
        this.isLoading = true;
        const seedFileText = String(await this.readFile());
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

    continueToPassword() {
      this.isReadyForPassword = true;
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
