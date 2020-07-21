/**
 * @notice This mixin contains generic helper functions
 */
import Vue from 'vue';

export default Vue.extend({
  methods: {
    /**
     * Converts from sompis to KSP
     * @param val Value to convert, as string or number
     * @returns Converted value as a string
     */
    formatBalanceForHuman(val) {
      return String(Number(val) / 1e8);
    },
  },
});
