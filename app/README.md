# Kaspa Wallet

A web wallet for the Kaspa blockchain network

- [Kaspa Wallet](#kaspa-wallet)
  - [Development](#development)
    - [Setup](#setup)
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
