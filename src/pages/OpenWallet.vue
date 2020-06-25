<template>
  <q-page padding>
    <p class="primary">Unlock the wallet with your password</p>
    <base-input
      v-model="password"
      :type="isPasswordVisible ? 'text' : 'password'"
      hint="Enter your password"
      label="Password"
      :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
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
    handleOpen() {
      console.log('Open');
    },
  },
};
</script>
