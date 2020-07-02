import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    // These routes are used when a user has not connected a wallet. We add separate routes
    // for /create and /open so a user can override the browser's localstorage properties
    // if necessary
    path: '/',
    component: () => import('layouts/BaseLayoutHome.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/WalletHandler.vue') },
      { name: 'createWallet', path: '/create', component: () => import('pages/WalletCreate.vue') },
      { name: 'openWallet', path: '/open', component: () => import('pages/WalletOpen.vue') },
    ],
  },
  {
    // These routes are used after creating or unlocking a wallet
    path: '/wallet',
    component: () => import('layouts/BaseLayoutWallet.vue'),
    children: [
      { name: 'walletHome', path: '/wallet', component: () => import('pages/WalletHome.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
