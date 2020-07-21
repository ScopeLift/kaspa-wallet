<template>
  <q-page padding class="page-margin">
    <q-form ref="form" @submit="handleCreate">
      <p class="text-primary">Create a password for your new wallet</p>
      <!-- Password -->
      <base-input
        v-model="password1"
        :autofocus="true"
        :hint="passwordHint"
        :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
        label="Password"
        :rules="checkPasswordRequirements"
        :type="isPasswordVisible ? 'text' : 'password'"
        @iconClicked="isPasswordVisible = !isPasswordVisible"
        @input="resetFormValidations('form')"
      />
      <!-- Confirm password -->
      <base-input
        v-model="password2"
        class="q-mt-lg"
        :hint="passwordHint"
        :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
        label="Confirm Password"
        :rules="verifyPasswordsMatch(password1, password2)"
        :type="isPasswordVisible ? 'text' : 'password'"
        @iconClicked="isPasswordVisible = !isPasswordVisible"
        @input="resetFormValidations('createForm')"
      />
      <!-- Continue buttons -->
      <div class="column content-center text-center q-mt-lg">
        <base-button label="Create Wallet" :loading="isLoading" type="submit" />
        <base-button :flat="true" label="I have a wallet" @click="navigate" />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Wallet from 'src/wallet/Wallet';
import helpers from 'src/utils/mixin-helpers';

export default Vue.extend({
  name: 'CreateWallet',

  mixins: [helpers],

  data() {
    return {
      password1: '',
      password2: '',
      isLoading: false,
      isPasswordVisible: false,
    };
  },

  methods: {
    /**
     * @notice Creates a new wallet, sets the state, and saves the encrypted data to local storage
     */
    async handleCreate() {
      try {
        this.isLoading = true;
        // Generate new wallet
        const wallet = new Wallet(); // eslint-disable-line
        const encryptedMnemonic = await wallet.export(this.password1); // eslint-disable-line
        // Backup old wallet if it exists
        const existingWallet = this.$q.localStorage.getItem('kaspa-wallet-data');
        if (existingWallet) {
          const timestamp = new Date().getTime();
          this.$q.localStorage.set(`kaspa-wallet-data-${timestamp}`, existingWallet);
        }
        // Save new wallet in localstorage and set state
        this.$q.localStorage.set('kaspa-wallet-data', encryptedMnemonic);
        this.$q.localStorage.set('is-backed-up', false);
        await this.$store.dispatch('main/getWalletInfo', wallet);
        await this.$router.push({ name: 'walletBalance' });
      } catch (err) {
        this.isLoading = false;
        // @ts-ignore
        this.showError(err); // eslint-disable-line
      }
    },

    /**
     * @notice Takes user to the open page if data exists in local storage, and the
     * restore page otherwise
     */
    async navigate() {
      const hasWallet = Boolean(this.$q.localStorage.getItem('kaspa-wallet-data'));
      if (hasWallet) {
        await this.$router.push({ name: 'openWallet' });
      } else {
        await this.$router.push({ name: 'restoreWallet' });
      }
    },
  },
});
</script>
