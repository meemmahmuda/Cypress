describe('Admin Routes - Guest Access Protection', () => {
  const baseUrl = 'http://127.0.0.1:8000';

  before(() => {
    cy.request(`${baseUrl}/__test/routes`).then((res) => {
      cy.wrap(res.body).as('routesToTest');
    });
  });

  it('should redirect all protected admin routes to login when not authenticated', function () {
    this.routesToTest.forEach((route) => {
      if (route.method === 'GET') {
        cy.visit(`${baseUrl}${route.uri}`, { failOnStatusCode: false });
        cy.url().should('include', '/');
      } else if (route.method === 'POST') {
        cy.request({
          method: 'POST',
          url: `${baseUrl}${route.uri}`,
          failOnStatusCode: false,
        }).then((res) => {
          expect([401, 419, 302]).to.include(res.status);
        });
      }
    });
  });
});
