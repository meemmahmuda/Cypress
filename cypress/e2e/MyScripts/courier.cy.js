describe('Cypress courier login/logout test', () => {

    it('Navigate to courier', () => {
        cy.viewport(1280, 900);
        cy.visit('/')
        cy.wait(2000)

        // cy.url().should('include', 'courier')
        cy.wait(2000)

        cy.title().should('eq', 'Admin Login') 
        cy.wait(2000)
    })

    it('Login and logout courier', () => {
        cy.viewport(1280, 900);
        cy.Login("admin@gmail.com", "111")  
        cy.wait(2000)

        cy.url().should('include', '/dashboard') 
        cy.wait(2000)

        cy.title().should('eq', 'Dashboard') 
        cy.wait(2000)

        cy.contains('a.nav-link', 'Log out').click({ force: true })
        cy.wait(2000)

        cy.url().should((url) => {
            expect(url).to.match(/\/(login)?$/)
        })
        cy.wait(2000)
    })

})