describe('Visiting the wrong url', function () {
  it('should let us know we went wrong', function () {
    cy.visit('/wrong-url', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'not found');
  });
});
