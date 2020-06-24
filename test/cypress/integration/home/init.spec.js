import * as ctx from '../../../../quasar.conf.js';

describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the proper title and subtitle', () => {
    cy.get('[data-cy="home-header"]').should('contain', 'Kaspa Wallet');
    cy.get('[data-cy="home-subheader"]').should('contain', 'TestNet v0.8');
  });

  // it('has pretty logo', () => {
  //   cy.get('.landing-wrapper img')
  //     .should('have.class', 'logo-main')
  //     .and('have.attr', 'src')
  //     .and('match', /^(data:image\/svg\+xml).+/);
  // });
});
