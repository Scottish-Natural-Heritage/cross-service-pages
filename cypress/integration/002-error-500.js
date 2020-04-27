describe('Internal server error page', function () {
  it('successfully loads', function () {
    cy.visit('/error-500', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem');
  });
});
