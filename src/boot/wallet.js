import { LocalStorage } from 'quasar';

// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ store }) => {
  /* eslint-disable */
  // Check local storage for encrypted key
  const value = LocalStorage.getItem('kaspa-wallet-data');
  const hasWallet = Boolean(value);
  await store.commit('main/hasWallet', hasWallet);
};
