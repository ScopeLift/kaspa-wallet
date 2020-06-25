# Kaspa Wallet

A web wallet for the Kaspa blockchain network

- [Kaspa Wallet](#kaspa-wallet)
  - [Development](#development)
    - [Setup](#setup)
    - [Development considerations](#development-considerations)
      - [Creating Components and Pages](#creating-components-and-pages)
    - [Git Hooks](#git-hooks)
    - [Testing Considerations](#testing-considerations)
      - [Cypress](#cypress)
      - [Jest](#jest)

## Development

### Setup

```bash
# Navigate to the app folder
cd app

# Install dependencies
npm install

# Run for development in PWA mode
npm run dev

# Build for production in PWA mode
npm run build

# Lint files
npm run lint

# Run unit tests with Jest
npm run test:unit

# Run e2e tests visually and interactively with Cypress
npm run test:e2e

# Run e2e tests from the terminal with Cypress
npm run test:e2e:CI
```

While running the app, you may occasionally notice some caching issues (i.e. a page
displaying outdated content). Until more robust cache-busting is implemented, simply
do a hard refresh to fix this.

### Development considerations

#### Creating Components and Pages

Create a new component with `quasar new component ComponentName` and a new page
with `quasar new page ComponentName`. By default, the component or page will not
be configured for Typescript. After updating the `name` property, make the
following changes to the default component content shown below:

```diff
<template>
  <div>My component</div>
</template>

- <script>
+ <script lang="ts">
+ import Vue from 'vue';

- export default {
+ export default Vue.extend({
  name: 'MyComponentName',
  data () {
    return {}
  }
- }
+ })
</script>
```

This change is necessary so Typescript can infer the component type when imported by
other components or pages.

### Git Hooks

Pre-commit and pre-push hooks are configured using [Husky](https://github.com/typicode/husky).

The pre-commit hook runs Prettier and ESLint on the code, and the pre-push hook will
do the same but also run the configured e2e tests and unit tests.
Hooks can be skipped by adding the `--no-verify` flag to the git command.

If you need to ignore a file or a section of a file, use the special comment format
documented [here](https://prettier.io/docs/en/ignore.html).

To manually prettify a file without relying on the hooks, run `npm run pretty`.

### Testing Considerations

End-to-end (e2e) tests are written with [Cypress](https://www.cypress.io/), and unit tests
are written with [Jest](https://jestjs.io/).

#### Cypress

To facilitate testing, add an attribute of the form `data-cy="page-component-value"` to
any HTML elements that may need to be accessed during testing. This format is not rigid,
and you can remove a section as needed. See the
[Best Practices](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements)
page of the Cypress documentation for more information about the reasoning behind this
approach. Some example implementations:

- `data-cy="home-header"` to describe the header element on the home page (notice that the component aspect is not used here)
- `data-cy="newWallet-enterPassword-input1"` to describe the first password input field during the wallet creation process

#### Jest

The [`@quasar/testing`](https://testing.quasar.dev/)
framework used for integrating Cypress and Jest enables the ability to place test
code directly in Vue files, as explained [here](https://testing.quasar.dev/#unit-testing).
This is not currently used, but will become useful when we need to test methods that live
within Vue components.
