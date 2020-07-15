<template>
  <q-page padding class="text-primary page-margin">
    <q-form @submit="handleOpen">
      <p class="text-primary">Unlock the wallet with your password</p>
      <base-input
        v-model="password"
        hint="Enter your password"
        :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
        label="Password"
        :type="isPasswordVisible ? 'text' : 'password'"
        @iconClicked="isPasswordVisible = !isPasswordVisible"
      />
      <div class="column content-center text-center q-mt-lg">
        <base-button
          :disable="!isPasswordValid"
          label="Open Wallet"
          :loading="isLoading"
          type="submit"
        />
        <base-button
          :flat="true"
          label="New wallet"
          @click="$router.push({ name: 'createWallet' })"
        />
        <base-button
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
import Wallet from 'src/wallet/Wallet';
import helpers from 'src/utils/mixin-helpers';

export default Vue.extend({
  name: 'OpenWallet',

  mixins: [helpers],

  data() {
    return {
      password: '',
      isLoading: false,
      isPasswordVisible: false,
    };
  },

  computed: {
    isPasswordValid(): boolean {
      return this.password.length > 0;
    },
  },

  methods: {
    /**
     * @notice Decrypts local storage data and sets state. Throws on invalid password
     */
    async handleOpen() {
      try {
        this.isLoading = true;
        const encryptedMnemonic = this.$q.localStorage.getItem('kaspa-wallet-data');
        const wallet = await Wallet.import(this.password, encryptedMnemonic); // eslint-disable-line
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
