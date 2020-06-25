<template>
  <q-page padding>
    <!-- Headings -->
    <h1 class="text-center q-mb-none" data-cy="home-header">Kaspa Wallet</h1>
    <h3 class="text-center secondary q-mt-none q-mb-xl" data-cy="home-subheader">TestNet v0.8</h3>

    <!-- Content -->
    <div class="row items-center justify-center text-center">
      <q-card
        class="col-auto card-border q-pa-lg q-mx-lg q-my-md"
        @click="$router.push({ name: 'createWallet' })"
      >
        <q-card-section>
          <div class="text-grey">I'm new</div>
          <h6>Make me a wallet</h6>
        </q-card-section>
      </q-card>

      <q-card
        class="col-auto card-border q-pa-lg q-mx-lg q-my-md"
        @click="$router.push({ name: 'openWallet' })"
      >
        <q-card-section>
          <div class="text-grey">I have a wallet</div>
          <h6>Access my wallet</h6>
        </q-card-section>
      </q-card>
    </div>

    <div class="row items-center justify-evenly q-mt-xl">
      <example-component title="Example component" active :todos="todos" :meta="meta" />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

import ExampleComponent from 'components/OptionsComponent.vue';
import { Todo, Meta } from 'components/models';

export default Vue.extend({
  name: 'PageIndex',
  components: { ExampleComponent },
  data() {
    const todos: Todo[] = [
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ];
    const meta: Meta = {
      totalCount: 1200,
    };
    return { todos, meta };
  },
});
</script>
