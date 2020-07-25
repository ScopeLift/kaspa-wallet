<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
    data-cy="error404"
  >
    <div>
      <div data-cy="error404-header" style="font-size: 30vh;">
        404
      </div>

      <div class="text-h2" data-cy="error404-test" style="opacity: 0.4;">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        data-cy="error404-homeBtn"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Error404',
});
</script>
