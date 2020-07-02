<template>
  <q-page padding class="text-primary page-margin">
    <p class="primary">Unlock the wallet with your password</p>
    <base-input
      v-model="password"
      hint="Enter your password"
      :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      @iconClicked="isPasswordVisible = !isPasswordVisible"
    />
    <div class="column content-center text-center q-mt-lg">
      <base-button :disable="!isPasswordValid" label="Open Wallet" @click="handleOpen" />
      <base-button
        :flat="true"
        :dense="true"
        label="New wallet"
        @click="$router.push({ name: 'createWallet' })"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'OpenWallet',

  data() {
    return {
      password: '',
      isPasswordVisible: false,
    };
  },

  computed: {
    isPasswordValid(): boolean {
      return this.password.length > 0;
    },
  },

  methods: {
    async handleOpen() {
      await this.$router.push({ name: 'walletBalance' }); // eslint-disable-line
    },
  },
});
</script>
