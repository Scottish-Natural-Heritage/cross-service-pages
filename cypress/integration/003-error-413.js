describe('Internal server error page', function () {
  it('successfully loads', function () {
    cy.visit('/error-413', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'Maximum permitted file size exceeded');
  });
});
