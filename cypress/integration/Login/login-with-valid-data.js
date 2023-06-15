/// <reference types="cypress" />

describe('Valid Login', () => {

    it('Visit Url', () => {
        cy.visit('http://zero.webappsecurity.com')
        cy.get('div').should('contain', 'Home')
    });

    it('login', () => {
        cy.get('#signin_button').click()
        cy.url().should('include','login.html')

        cy.fixture("login").then(user => {
            const username = user.username
            const password = user.password

            cy.Login(username,password)
        })
        cy.url().should('include','account-summary.html')
        cy.get('#account_summary_tab').should('contain', 'Account Summary')
    });
})

// Export the test case
module.exports = {
    loginValidData: {
      spec: 'cypress/integration/Login/login-with-valid-data.js',
      tags: '@login',
    },
}