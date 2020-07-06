<template>
  <div>
    <q-btn
      class="q-my-sm"
      :class="{ 'full-width': fullWidth }"
      :color="color"
      :disable="disable"
      :dense="dense"
      :flat="flat"
      :label="label"
      :loading="loading"
      :outline="outline"
      :type="type"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseButton',

  props: {
    color: {
      type: String,
      required: false,
      default: 'primary',
    },

    dense: {
      type: Boolean,
      required: false,
      default: false,
    },

    disable: {
      type: Boolean,
      required: false,
      default: false,
    },

    flat: {
      type: Boolean,
      required: false,
      default: false,
    },

    fullWidth: {
      type: Boolean,
      required: false,
      default: false,
    },

    label: {
      type: String,
      required: true,
      default: undefined,
    },

    loading: {
      type: Boolean,
      required: false,
      default: false,
    },

    outline: {
      type: Boolean,
      required: false,
      default: false,
    },

    type: {
      type: String,
      required: false,
      default: 'button',
    },
  },
  data() {
    return {};
  },

  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
});
</script>
