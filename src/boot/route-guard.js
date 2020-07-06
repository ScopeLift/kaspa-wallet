// Redirect user to home page if they are not logged in
/* eslint-disable */
export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isLoggedIn = store.state.main.wallet?.address;
    if (
      isLoggedIn ||
      to.name === 'home' ||
      to.name === 'createWallet' ||
      to.name === 'openWallet'
    ) {
      next();
    } else {
      next({ name: 'home' });
    }
  });
};
