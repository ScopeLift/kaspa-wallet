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
        <base-button :flat="true" :dense="true" label="I have a wallet" @click="navigate" />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import Wallet from 'src/wallet/Wallet';
import Component, { mixins } from 'vue-class-component';
import { Helpers } from 'components/mixins';

@Component
export default class WalletCreate extends mixins(Helpers) {
  password1 = '';
  password2 = '';
  isLoading = false;
  isPasswordVisible = false;

  /**
   * @notice Returns true if all requirements for a valid password are met
   */
  get isPasswordValid() {
    return this.password1.length > 0 && this.password1 === this.password2;
  }
}
</script>
