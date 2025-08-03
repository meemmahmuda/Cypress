describe('Deliveryman OTP Enforcement', () => {
  const baseUrl = 'http://127.0.0.1:8000';
  const loginEmail = 'dm1@gmail.com'; 
  const loginPassword = '123456789';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('prevents access to dashboard without OTP verification', () => {
    // Step 1: Login (which redirects to OTP page)
    cy.visit(`${baseUrl}/deliveryman/login`);
    cy.get('input[name="email"]').type(loginEmail);
    cy.get('input[name="password"]').type(loginPassword);
    cy.get('button[type="submit"]').click();

    // Confirm redirected to OTP page
    cy.url({ timeout: 10000 }).should('include', '/deliveryman/otp-verify');

    // Step 2: Try to directly visit dashboard without submitting OTP
    cy.visit(`${baseUrl}/deliveryman/dashboard`, { failOnStatusCode: false });

    // Should redirect to login or OTP page, adjust as per your app
    cy.url({ timeout: 10000 }).should(url => {
      expect(url).to.match(/\/deliveryman\/(login|otp-verify)/);
    });
  });

  it('prevents access to profile without OTP verification', () => {
    // Login first
    cy.visit(`${baseUrl}/deliveryman/login`);
    cy.get('input[name="email"]').type(loginEmail);
    cy.get('input[name="password"]').type(loginPassword);
    cy.get('button[type="submit"]').click();

    // Confirm on OTP page
    cy.url({ timeout: 10000 }).should('include', '/deliveryman/otp-verify');

    // Try to visit profile without OTP
    cy.visit(`${baseUrl}/deliveryman/profile`, { failOnStatusCode: false });

    // Should redirect to login or OTP page
    cy.url({ timeout: 10000 }).should(url => {
      expect(url).to.match(/\/deliveryman\/(login|otp-verify)/);
    });
  });
});

