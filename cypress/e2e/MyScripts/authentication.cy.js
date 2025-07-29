describe('Navigation Test', () => {
  it('should navigate to Dashboard and Cancelled pages after login', () => {
    cy.visit('https://list.sanjoydeyreju.com/');
    cy.viewport(1280, 900); 

    // Login
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('111');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.url().should('not.include', '/login');

    // Navigate to Dashboard
    cy.contains('a', 'Dashboard').click();
    cy.url().should('include', '/dashboard');
    cy.wait(500);

    // Navigate to Cancelled
    cy.contains('a', 'Cancelled').click();
    cy.url().should('include', '/cancelled');
    cy.wait(500);
  });

  it('should redirect to login if not authenticated', () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    // Visit protected route
    cy.visit('https://list.sanjoydeyreju.com/cancelled');
    cy.viewport(1280, 900); 
    cy.wait(500);

    // Should be redirected to login
    cy.url().should('eq', 'https://list.sanjoydeyreju.com/');
    cy.wait(500);
  });  
});