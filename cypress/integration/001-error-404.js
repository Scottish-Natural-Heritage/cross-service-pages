describe('Page not found error page', function () {
  it('successfully loads', function () {
    cy.visit('/error-404', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'not found');
  });
});
