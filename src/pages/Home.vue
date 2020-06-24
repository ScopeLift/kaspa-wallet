<template>
  <q-page padding>
    <h1
      class="text-center q-mb-none"
      data-cy="home-header"
    >Kaspa Wallet</h1>
    <h3
      class="text-center secondary q-mt-none"
      data-cy="home-subheader"
    >TestNet v0.8</h3>
    <div class="row items-center justify-evenly">
      <example-component
        title="Example component"
        active
        :todos="todos"
        :meta="meta"
      />
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
