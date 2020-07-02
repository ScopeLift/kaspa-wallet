import { LocalStorage } from 'quasar';
import bitcoreKaspaSetup from 'src/wallet/bitcoreKaspaSetup';

// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ store }) => {
  /* eslint-disable */
  bitcoreKaspaSetup();

  // Check local storage for encrypted key
  const value = LocalStorage.getItem('kaspa-wallet-data');
  const hasWallet = Boolean(value);
  await store.commit('main/hasWallet', hasWallet);
};
