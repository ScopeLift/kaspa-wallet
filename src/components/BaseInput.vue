<template>
  <div>
    <q-input
      v-model="content"
      color="primary"
      class="q-my-sm"
      :dense="dense"
      :hide-bottom-space="hideBottomSpace"
      :hint="hint"
      :label="label"
      :lazy-rules="lazyRules"
      :rules="[(val) => rules(val)]"
      :type="type"
      :outlined="outlined"
      @input="handleInput"
    >
      <template v-if="iconAppend" v-slot:append>
        <q-icon class="cursor-pointer" :name="iconAppend" @click="$emit('iconClicked')" />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseInput',

  props: {
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },

    iconAppend: {
      type: String,
      required: false,
      default: undefined,
    },

    hideBottomSpace: {
      type: Boolean,
      required: false,
      default: false,
    },

    hint: {
      type: String,
      required: false,
      default: undefined,
    },

    label: {
      type: String,
      required: true,
      default: undefined,
    },

    lazyRules: {
      type: Boolean,
      required: false,
      default: true,
    },

    rules: {
      type: Function,
      required: false,
      default() {
        return true;
      },
    },

    type: {
      type: String,
      required: false,
      default: undefined,
    },

    outlined: {
      type: Boolean,
      required: false,
      default: true,
    },

    value: {
      type: undefined,
      required: true,
      default: undefined,
    },
  },

  data() {
    return {
      content: this.value,
    };
  },

  watch: {
    /**
     * @notice This is required for two-way binding when programtically updating the input
     * in the parent component using BaseInput
     */
    value(val) {
      // TODO update TS support so the eslint-disable is no longer needed
      this.content = val; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    },
  },

  methods: {
    handleInput() {
      this.$emit('input', this.content);
    },
  },
});
</script>
