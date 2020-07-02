<template>
  <q-page padding class="page-margin">
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
      <base-button :disable="!isPasswordValid" label="Create Wallet" @click="handleCreate" />
      <base-button
        :flat="true"
        :dense="true"
        label="I have a wallet"
        @click="$router.push({ name: 'openWallet' })"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CreateWallet',

  data() {
    return {
      password1: '',
      password2: '',
      isPasswordVisible: false,
    };
  },

  computed: {
    isPasswordValid(): boolean {
      return this.password1.length > 0 && this.password1 === this.password2;
    },
  },

  methods: {
    async handleCreate() {
      this.$q.localStorage.set('kaspa-wallet-data', true);
      await this.$router.push({ name: 'walletBalance' });
    },
  },
});
</script>
