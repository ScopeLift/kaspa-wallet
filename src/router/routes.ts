import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/BaseLayoutHome.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/WalletHandler.vue') },
      { name: 'createWallet', path: '/create', component: () => import('pages/WalletCreate.vue') },
      { name: 'openWallet', path: '/open', component: () => import('pages/WalletOpen.vue') },
      {
        name: 'restoreWallet',
        path: '/restore',
        component: () => import('pages/WalletRestore.vue'),
      },
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
