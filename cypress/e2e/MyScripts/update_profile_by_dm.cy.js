describe('Edit Specific DM Test', () => {
  it('should login and edit a specific DM successfully', () => {
    cy.viewport(1280, 900);

    // Step 1: Login
    cy.visit('https://list.sanjoydeyreju.com/deliveryman/login');
    cy.get('input[name="email"]').type('testupdate@gmail.com');
    cy.get('input[name="password"]').type('ad458555fffr');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="otp"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');

    // Step 2: Go to Supervisor List page
    cy.visit('https://list.sanjoydeyreju.com/deliveryman/profile');

    cy.contains('button, a', 'Edit').click();  // This covers <button> or <a> with text "Edit"
    cy.wait(1000);


   // Step 4: Now edit the supervisor form
    cy.wait(500);
    cy.get('input[name="password"]').clear().type('05145ghgfhgdf');
    cy.get('textarea[name="address"]').clear().type('Dhaka');
    cy.get('input[name="mobile"]').clear().type('01888888957');
    // Upload image file
    cy.get('input[name="image"]').selectFile('cypress/fixtures/download.png', { force: true });

  //   // Step 5: Submit the form
    cy.contains('button', 'Update').click();

  //   // Step 6: Assert success message
  //   // cy.contains('Supervisor updated successfully').should('exist');
  });
});
