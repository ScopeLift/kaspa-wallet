<template>
  <q-page padding class="text-primary page-margin" data-cy="wallet-open">
    <q-form ref="form" data-cy="wallet-open-form" @submit="handleOpen">
      <p class="text-primary" data-cy="wallet-open-form-text">
        Unlock the wallet with your password
      </p>
      <base-input
        v-model="password"
        :autofocus="true"
        data-cy="wallet-open-form-pwInput"
        :hint="passwordHint"
        :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
        label="Password"
        :rules="checkPasswordRequirements"
        :type="isPasswordVisible ? 'text' : 'password'"
        @iconClicked="isPasswordVisible = !isPasswordVisible"
        @input="resetFormValidations('form')"
      />
      <div class="column content-center text-center q-mt-lg">
        <base-button
          label="Open Wallet"
          data-cy="wallet-open-form-openBtn"
          :loading="isLoading"
          type="submit"
        />
        <base-button
          data-cy="wallet-open-form-newBtn"
          :flat="true"
          label="New wallet"
          @click="$router.push({ name: 'createWallet' })"
        />
        <base-button
          data-cy="wallet-open-form-restoreBtn"
          :flat="true"
          label="Restore wallet"
          @click="$router.push({ name: 'restoreWallet' })"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import Wallet from 'src/wallet/Wallet';
// @ts-ignore
import helpers from 'src/utils/mixin-helpers';

export default Vue.extend({
  name: 'OpenWallet',

  mixins: [helpers],

  data() {
    return {
      password: '',
      failedAttempts: 0,
      isDisabled: false,
      isLoading: false,
      isPasswordVisible: false,
    };
  },

  methods: {
    /**
     * @notice Decrypts local storage data and sets state. Throws on invalid password
     */
    async handleOpen() {
      try {
        this.isLoading = true;
        const encryptedMnemonic = this.$q.localStorage.getItem('kaspa-wallet-data');
        // @ts-ignore
        const wallet = await Wallet.import(this.password, encryptedMnemonic); // eslint-disable-line
        await this.$store.dispatch('main/getWalletInfo', wallet);
        await this.$router.push({ name: 'walletBalance' });
      } catch (err) {
        // eslint-disable-next-line
        if (err.message === 'Incorrect password') {
          this.failedAttempts += 1;
          // Temporarily diable the form after too many failed attempts
          if (this.failedAttempts === 5) {
            this.isDisabled = true;
            this.temporarilyBlockLogin();
            this.isLoading = false;
            return;
          }
        }
        this.isLoading = false;
        // @ts-ignore
        this.showError(err); // eslint-disable-line
      }
    },

    temporarilyBlockLogin() {
      const delay = 10;
      // @ts-ignore
      this.notifyUser('negative', `Too many failed attempts. Please wait ${delay} seconds.`); // eslint-disable-line
      setTimeout(() => {
        this.isDisabled = false;
        this.failedAttempts = 0;
      }, delay * 1000);
    },
  },
});
</script>
