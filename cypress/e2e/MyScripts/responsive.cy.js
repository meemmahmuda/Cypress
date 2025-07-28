const viewports = [
  { name: 'large-desktop', width: 1200, height: 900 },
  { name: 'medium-device', width: 992, height: 900 },
  { name: 'small-device', width: 360, height: 900 },
]

viewports.forEach(({ name, width, height }) => {
  describe(`Responsive test on ${name} (${width}px)`, () => {
    it(`should display login and logout correctly on viewport width ${width}px`, () => {
      cy.viewport(width, height)
      cy.visit('/')
      cy.title().should('include', 'Admin Login')
      cy.wait(2000)

      cy.Login("admin@gmail.com", "111")
      cy.wait(2000)

      cy.url().should('include', '/dashboard')
      cy.wait(2000)

      if (width <= 576) {
        cy.get('a.nav-link[data-widget="pushmenu"]').click()
        cy.wait(1000) 
      }

      cy.contains('a.nav-link', 'Log out').click({ force: true })
      cy.wait(2000)

      cy.url().should((url) => {
        expect(url).to.match(/\/(login)?$/)
      })
      cy.wait(2000)
    })
  })
})