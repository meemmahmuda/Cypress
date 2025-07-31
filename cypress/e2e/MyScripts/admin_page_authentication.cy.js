describe('Auth Protection Test - Redirect to Login if not authenticated', () => {
  let protectedRoutes = [];

  before(() => {
    // Fetch all protected routes from your Laravel /__test/routes endpoint
    cy.request('http://127.0.0.1:8000/__test/routes').then((res) => {
      expect(res.status).to.eq(200);
      expect(Array.isArray(res.body)).to.be.true;
      protectedRoutes = res.body;
    });
  });

  it('should redirect to login page when visiting protected GET routes without login', () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    protectedRoutes
      .filter(route => route.method === 'GET')
      .forEach((route) => {
        cy.visit(`http://127.0.0.1:8000${route.uri}`, { failOnStatusCode: false });
        cy.wait(300);
        cy.url().should('eq', 'http://127.0.0.1:8000/'); // expect redirect to login page
      });
  });

  it('should reject unauthenticated POST requests (302, 401, 403, or 419)', () => {
    protectedRoutes
      .filter(route => route.method === 'POST')
      .forEach((route) => {
        cy.request({
          method: 'POST',
          url: `http://127.0.0.1:8000${route.uri}`,
          failOnStatusCode: false,
          followRedirect: false,
        }).then((response) => {
          expect([302, 401, 403, 419]).to.include(response.status);
          if (response.status === 302) {
            expect(response.redirectedToUrl).to.include('/'); // login page URL
          }
          if (response.status === 419) {
            cy.log('Request rejected due to missing CSRF token.');
          }
        });
      });
  });
});
