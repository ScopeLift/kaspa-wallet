<template>
  <!--
  This layout is used when the user first visits the site and has not yet created
  a wallet nor opened an existing one
  -->
  <q-layout view="hHh Lpr fFf">
    <q-header> </q-header>

    <q-page-container class="all-content-format" style="margin: 0 auto;">
      <router-view />
    </q-page-container>

    <q-footer> </q-footer>
  </q-layout>
</template>

<script lang="ts">
export default {
  name: 'BaseLayoutHome',

  data() {
    return {};
  },
};
</script>
