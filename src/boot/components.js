// Configure globally available components
import BaseButton from 'components/BaseButton';
import BaseInput from 'components/BaseInput';
import bitcoreKaspaSetup from 'components/bitcoreKaspaSetup';

// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ Vue }) => {
  // TODO Configure as components.ts and re-enable ESLint
  /* eslint-disable */
  Vue.component('base-button', BaseButton);
  Vue.component('base-input', BaseInput);
  bitcoreKaspaSetup();
};
