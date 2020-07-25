<template>
  <!--
  This layout is used when the user first visits the site and has not yet created
  a wallet nor opened an existing one
  -->
  <q-layout view="hHh Lpr fFf" data-cy="base-layout-home">
    <q-header data-cy="base-layout-home-header"> </q-header>

    <q-page-container
      class="all-content-format"
      data-cy="base-layout-home-container"
      style="margin: 0 auto;"
    >
      <router-view />
    </q-page-container>

    <q-footer data-cy="base-layout-home-footer"> </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'BaseLayoutHome',

  data() {
    return {};
  },
};
</script>
