# Kaspa Wallet

A web wallet for the Kaspa blockchain network

## Development

### Setup

```bash
# Navigate to the app folder
cd app

# Install dependencies
npm install

# Run for development
npm run dev

# Build for production
npm run build

# Lint files
npm run lint

# Run e2e tests visually and interactively
npm run test:e2e

# Run e2e tests from the terminal
npm run test:e2e:CI
```

### Testing Considerations

End-to-end (e2e) tests are written with [Cypress](https://www.cypress.io/), and unit tests
are written with [Jest](https://jestjs.io/).

To facilitate testing, add an attribute of the form `data-cy="page-component-value"` to
any HTML elements that may need to be accessed during testing. This format is not rigid,
and you can remove a section as needed. See the
[Best Practices](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements)
page of the Cypress documentation for more information about the reasoning behind this
approach. Some example implementations:

- `data-cy="home-header"` to describe the header element on the home page (notice that the component aspect is not used here)
- `data-cy="newWallet-enterPassword-input1"` to describe the first password input field during the wallet creation process
