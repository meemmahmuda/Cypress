describe('Auth Protection Test - Redirect to Login if not authenticated', () => {
  let protectedRoutes = [];

  before(() => {
    cy.request('http://127.0.0.1:8000/__test/routes').then((res) => {
      expect(res.status).to.eq(200);
      expect(Array.isArray(res.body)).to.be.true;
      protectedRoutes = res.body;
    });
  });

  it('should redirect to login page when visiting protected routes without login', () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    protectedRoutes.forEach((route) => {
      cy.visit(`http://127.0.0.1:8000${route}`, { failOnStatusCode: false });
      cy.wait(300);
      cy.url().should('eq', 'http://127.0.0.1:8000/');
    });
  });
});
