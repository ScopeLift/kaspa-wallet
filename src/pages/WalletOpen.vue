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
      <base-button label="Open Wallet" @click="handleOpen" />
      <base-button
        :flat="true"
        :dense="true"
        label="New wallet"
        @click="$router.push({ name: 'createWallet' })"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'OpenWallet',
  data() {
    return {
      password: '',
      isPasswordVisible: false,
    };
  },
  methods: {
    async handleOpen() {
      await this.$router.push({ name: 'walletHome' }); // eslint-disable-line
    },
  },
};
</script>
