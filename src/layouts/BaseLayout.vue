<template>
  <q-layout view="hHh Lpr fFf">
    <q-header> </q-header>

    <q-page-container class="all-content-format" style="margin: 0 auto;">
      <router-view />
    </q-page-container>

    <q-footer> </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'BaseLayout',

  data() {
    return {};
  },
};
</script>
