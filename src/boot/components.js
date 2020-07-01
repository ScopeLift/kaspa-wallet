// Configure globally available components
import BaseButton from 'components/BaseButton';
import BaseInput from 'components/BaseInput';
import bitcore from 'bitcore-lib-cash';

// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ Vue }) => {
  // TODO Configure as components.ts and re-enable ESLint
  /* eslint-disable */
  Vue.component('base-button', BaseButton);
  Vue.component('base-input', BaseInput);

  const networkPrefixes = ['kaspa', 'kaspadev', 'kaspareg', 'kaspatest', 'kaspasim'];

  networkPrefixes.map((str) => {
    bitcore.Networks.add({
      name: str,
      prefix: str,
      pubkeyhash: 0x00, //publickey hash prefix
      privatekey: 0x80, // privatekey prefix -- must be 128 or toWIF() result will not match with kaspa
      scripthash: 0x05,
      xpubkey: 0x0488b21e, // extended public key magic
      xprivkey: 0x0488ade4, // extended private key magic
      networkMagic: 0xdab5bffa, // network magic number
    });
  });
};
