/**
 * @notice This mixin contains generic helper functions
 */
import Vue from 'vue';
import { Notify } from 'quasar';

export default Vue.extend({
  data() {
    return {
      passwordHint: 'At least 8 characters, one capital, one lower, one number, and one symbol',
    };
  },

  methods: {
    /**
     * Checks if the provided password meets the requirements
     * @param password Password to check
     * @returns true if password is valid, false otherwise
     */
    checkPasswordRequirements(password) {
      const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      return regex.test(password);
    },

    /**
     * Present notification alert to the user
     * @param {string} color alert color, choose positive, negative, warning, info, or others
     * @param {string} message message to display on notification
     */
    notifyUser(color: string, message: string) {
      Notify.create({
        color,
        message,
        timeout: color.toLowerCase() === 'negative' ? 10000 : 5000,
        position: 'top',
        actions: [{ label: 'Dismiss', color: 'white' }],
      });
    },

    /* eslint-disable */
    /**
     * Show error message to user
     * @param {Any} err Error object thrown
     * @param {Any} msg Optional, fallback error message if one is not provided by the err object
     */
    showError(err: any, msg = 'An unknown error occurred') {
      console.error(err);
      if (!err) this.notifyUser('negative', msg);
      else if (err.message) this.notifyUser('negative', err.message);
      else if (err.msg) this.notifyUser('negative', err.msg);
      else if (typeof err === 'string') this.notifyUser('negative', err);
      else this.notifyUser('negative', msg);
    },
  },
});
