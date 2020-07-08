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
          :dense="true"
          label="New wallet"
          @click="$router.push({ name: 'createWallet' })"
        />
        <base-button
          :flat="true"
          :dense="true"
          label="Restore wallet"
          @click="$router.push({ name: 'restoreWallet' })"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import Wallet from 'src/wallet/Wallet';
import Component, { mixins } from 'vue-class-component';
import { Helpers } from 'components/mixins';
import { LocalStorage } from 'quasar';

@Component
export default class WalletOpen extends mixins(Helpers) {
  password = '';
  isLoading = false;
  isPasswordVisible = false;

  get isPasswordValid() {
    return this.password.length > 0;
  }

  /**
   * @notice Decrypts local storage data and sets state. Throws on invalid password
   */
  async handleOpen() {
    try {
      this.isLoading = true;
      const encryptedMnemonic = LocalStorage.getItem('kaspa-wallet-data');
      // Next line is ignored because it gives the below error on compilation:
      // TS2345: Argument of type 'string | number | boolean | object | RegExp | Date | null' is not assignable to parameter of type 'string'.
      // Type 'null' is not assignable to type 'string'.
      // @ts-ignore
      const wallet = await Wallet.import(this.password, encryptedMnemonic);
      await this.$store.dispatch('main/getWalletInfo', wallet);
      await this.$router.push({ name: 'walletBalance' });
    } catch (err) {
      this.isLoading = false;
      this.showError(err);
    }
  }
}
</script>
