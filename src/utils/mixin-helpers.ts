/**
 * @notice This mixin contains generic helper functions
 */
import Vue from 'vue';
import { Notify } from 'quasar';

export default Vue.extend({
  data() {
    return {};
  },

  methods: {
    /**
     * Present notification alert to the user
     * @param {string} color alert color, choose positive, negative, warning, info, or others
     * @param {string} message message to display on notification
     */
    notifyUser(color: string, message: string) {
      Notify.create({
        color,
        message,
        // If positive, timeout after 5 seconds. Otherwise, show until dismissed by user
        timeout: color.toLowerCase() === 'positive' ? 5000 : 0,
        position: 'top',
        actions: [{ label: 'Dismiss', color: 'white' }],
      });
    },
  },
});
