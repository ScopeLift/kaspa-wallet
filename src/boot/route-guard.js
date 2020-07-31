// Redirect user to home page if they are not logged in
/* eslint-disable */
export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // Check if user has opened a wallet
    const isLoggedIn = store.state.main.wallet?.mnemonic;
    // Define list of page names that don't require login to access
    const publicPages = ['home', 'createWallet', 'openWallet', 'restoreWallet'];
    if (isLoggedIn || publicPages.includes(to.name)) {
      next();
    } else {
      next({ name: 'home' });
    }
  });
};
