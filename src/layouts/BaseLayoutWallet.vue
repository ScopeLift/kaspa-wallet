<template>
  <!--
  This layout is used when the user first visits the site and has not yet created
  a wallet nor opened an existing one
  -->
  <q-layout view="hHh Lpr fFf" data-cy="base-layout-wallet">
    <q-header data-cy="base-layout-wallet-header">
      <q-toolbar
        class="bg-primary text-white shadow-2 rounded-borders"
        data-cy="base-layout-wallet-header-toolbar"
      >
        <div>
          <div>
            Kaspa Wallet
          </div>
          <div class="text-caption">
            TestNet v0.4.1
          </div>
        </div>
        <q-space />

        <q-tabs v-model="tab" data-cy="base-layout-wallet-navTabs" shrink stretch>
          <q-route-tab
            data-cy="base-layout-wallet-navTabs-send"
            exact
            label="Send"
            name="walletSend"
            :to="{ name: 'walletSend' }"
          />
          <q-route-tab
            data-cy="base-layout-wallet-navTabs-balance"
            exact
            label="Balance"
            name="walletBalance"
            :to="{ name: 'walletBalance' }"
          />
          <q-route-tab
            data-cy="base-layout-wallet-navTabs-receive"
            exact
            label="Receive"
            name="walletReceive"
            :to="{ name: 'walletReceive' }"
          />
          <q-route-tab
            data-cy="base-layout-wallet-navTabs-settings"
            exact
            label="Settings"
            name="settings"
            :to="{ name: 'settings' }"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container
      class="all-content-format"
      data-cy="base-layout-wallet-container"
      style="margin: 0 auto;"
    >
      <router-view />
    </q-page-container>

    <q-footer data-cy="base-layout-wallet-footer"> </q-footer>
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
