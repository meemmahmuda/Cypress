// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Cypress.Commands.add('Login', (email, password) => {
//     cy.visit('/dashboard')
//     cy.get('#Input_Email').type(email)
//     cy.get('#Input_Password').type(password)
//     cy.get('#login-submit').click()
// });

Cypress.Commands.add('Login', (email, password) => {
    cy.visit('http://courier.sanjoydeyreju.com')

    cy.get('input[name="email"]').should('be.visible').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
});

