describe('Deliveryman Routes - Guest Access Protection', () => {
  const baseUrl = 'http://127.0.0.1:8000';

  before(() => {
    cy.request(`${baseUrl}/__test/deliveryman-routes`).then((res) => {
      cy.wrap(res.body).as('routesToTest');
    });
  });

  it('should redirect unauthenticated user to login for all protected routes', function () {
    this.routesToTest.forEach((route) => {
      if (route.method === 'GET') {
        cy.visit(`${baseUrl}${route.uri}`);
        cy.url().should('include', '/deliveryman/login');
      } else if (route.method === 'POST') {
        cy.request({
          method: 'POST',
          url: `${baseUrl}${route.uri}`,
          failOnStatusCode: false,
        }).then((res) => {
          expect([302, 401, 419]).to.include(res.status);
        });
      }
    });
  });
});
