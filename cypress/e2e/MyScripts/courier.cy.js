describe('cypress test', () => {

    it('Navigate to courier', () => {
        cy.visit('/')
        cy.url().should('include', 'courier')
        cy.title().should('eq', 'Admin Login') 
    })

    it('Login courier', () => {
        cy.Login("admin@gmail.com", "111")
        cy.url().should('include', '/dashboard')
        cy.title().should('eq', 'Dashboard') 
    })

})
