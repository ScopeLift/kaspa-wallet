<template>
  <q-page padding>
    <p class="primary">Create a password for your new wallet</p>
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
      :type="isPasswordVisible ? 'text' : 'password'"
      hint="Re-enter your password"
      label="Confirm Password"
      :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
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
    handleCreate() {
      console.log('Create');
    },
  },
});
</script>
