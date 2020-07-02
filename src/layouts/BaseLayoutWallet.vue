<template>
  <!--
  This layout is used when the user first visits the site and has not yet created
  a wallet nor opened an existing one
  -->
  <q-layout view="hHh Lpr fFf">
    <!-- <q-header class="text-white white"> -->
    <q-toolbar class="bg-primary text-white shadow-2 rounded-borders">
      <q-btn flat label="Kaspa Wallet" />
      <q-space />

      <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
      <q-tabs v-model="tab" shrink stretch>
        <q-route-tab exact label="Send" name="walletSend" :to="{ name: 'walletSend' }" />
        <q-route-tab exact label="Balance" name="walletBalance" :to="{ name: 'walletBalance' }" />
        <q-route-tab exact label="Receive" name="walletReceive" :to="{ name: 'walletReceive' }" />
      </q-tabs>
    </q-toolbar>
    <!-- </q-header> -->

    <q-page-container class="all-content-format" style="margin: 0 auto;">
      <router-view />
    </q-page-container>

    <q-footer> </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'BaseLayoutWallet',

  data() {
    return {
      tab: '',
    };
  },
};
</script>
