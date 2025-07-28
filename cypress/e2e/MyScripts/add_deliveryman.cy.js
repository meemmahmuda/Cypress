describe('Add DM Test', () => {
  it('should login and add a new delivery man successfully', () => {
    cy.viewport(1280, 900); 

    // Step 1: Visit Login Page
    cy.visit('https://list.sanjoydeyreju.com/');
    cy.wait(1000); // wait 1 second

    // Step 2: Login
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.wait(500);
    cy.get('input[name="password"]').type('111');
    cy.wait(500);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    // Step 3: Ensure login was successful
    cy.url().should('not.include', '/login');

    // Step 4: Visit Add Delivery Man page
    cy.visit('https://list.sanjoydeyreju.com/delivery_man_add');
    cy.wait(1000);

    // Step 5: Fill form fields
    cy.get('select[name="supervisor"]').select(
      '১ উত্তরা, ৬ উত্তরা, ৭ দক্ষিণখান, ৮ উত্তরখান, ৯ ভাটারা'
    );
    cy.wait(500);

    cy.get('input[name="name"]').type('Test Delivery Man');
    cy.wait(500);
    cy.get('input[name="email"]').type('deliveryman@example.com');
    cy.wait(500);
    cy.get('input[name="password"]').type('securePassword123');
    cy.wait(500);
    cy.get('input[name="dob"]').type('1980-12-09');
    cy.wait(500);
    cy.get('input[name="mobile"]').type('01710000000');
    cy.wait(500);
    cy.get('input[name="nid"]').type('5105186638');
    cy.wait(500);

    // Step 6: Select a supervisor from dropdown


    // Step 7: Submit the form
    cy.contains('button', 'Submit').click();
    cy.wait(1500);

    // Step 8: Assert success message
    cy.contains('Delivery Man added successfully').should('exist'); 
  });
});
