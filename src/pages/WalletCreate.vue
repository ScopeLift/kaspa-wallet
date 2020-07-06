<template>
  <q-page padding class="page-margin">
    <q-form @submit="handleCreate">
      <p class="text-primary">Create a password for your new wallet</p>
      <!-- Password -->
      <base-input
        v-model="password1"
        :type="isPasswordVisible ? 'text' : 'password'"
        hint="Enter your password"
        label="Password"
        :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
        @iconClicked="isPasswordVisible = !isPasswordVisible"
      />
      <!-- Confirm password -->
      <base-input
        v-model="password2"
        class="q-mt-lg"
        hint="Re-enter your password"
        :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
        label="Confirm Password"
        :type="isPasswordVisible ? 'text' : 'password'"
        @iconClicked="isPasswordVisible = !isPasswordVisible"
      />
      <!-- Continue buttons -->
      <div class="column content-center text-center q-mt-lg">
        <base-button
          :disable="!isPasswordValid"
          label="Create Wallet"
          :loading="isLoading"
          type="submit"
        />
        <base-button
          :flat="true"
          :dense="true"
          label="I have a wallet"
          @click="$router.push({ name: 'openWallet' })"
        />
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

  computed: {
    /**
     * @notice Returns true if all requirements for a valid password are met
     */
    isPasswordValid(): boolean {
      return this.password1.length > 0 && this.password1 === this.password2;
    },
  },

  methods: {
    /**
     * @notice Creates a new wallet, sets the state, and saves the encrypted data to local storage
     */
    async handleCreate() {
      try {
        this.isLoading = true;
        const wallet = new Wallet();
        const encryptedMnemonic = await wallet.export(this.password1);
        this.$q.localStorage.set('kaspa-wallet-data', encryptedMnemonic);
        this.$q.localStorage.set('is-backed-up', false);
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
