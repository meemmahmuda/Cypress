describe('Edit Specific Supervisor Test', () => {
  it('should login and edit a specific supervisor successfully', () => {
    cy.viewport(1280, 900);

    // Step 1: Login
    cy.visit('https://list.sanjoydeyreju.com/');
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('111');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');

    // Step 2: Go to Supervisor List page
    cy.visit('https://list.sanjoydeyreju.com/delivery_man');

    // Step 3: Find the row that contains the supervisor name and click Edit within that row
    cy.contains('td', 'Test Delivery Man')  // Find supervisor's name cell
    .parent('tr')                      // Go up to the table row
    .within(() => {
        cy.get('a.btn.btn-success').click();  // Click the eye icon link
    });
    cy.wait(1000);

    cy.contains('button, a', 'Edit').click();  // This covers <button> or <a> with text "Edit"
    cy.wait(1000);

    // Step 4: Now edit the supervisor form
    cy.get('select[name="status"]').select('active'); // or 'inactive', depending on your test case
    cy.wait(500);
    cy.get('select[name="zone"]').select('Supervisor-1');
    cy.get('input[name="name"]').clear().type('Test DM2');
    cy.get('input[name="email"]').clear().type('testupdate@gmail.com');
    cy.get('input[name="nid"]').clear().type('510000002222');
    cy.get('input[name="password"]').clear().type('ad458555fffr');
    cy.get('textarea[name="address"]').clear().type('Bangladesh');
    cy.get('input[name="mobile"]').clear().type('01888888810');
    // Upload image file
    cy.get('input[name="image"]').selectFile('cypress/fixtures/download.png', { force: true });


    // Step 5: Submit the form
    cy.contains('button', 'Update').click();

    // Step 6: Assert success message
    // cy.contains('Supervisor updated successfully').should('exist');
  });
});
