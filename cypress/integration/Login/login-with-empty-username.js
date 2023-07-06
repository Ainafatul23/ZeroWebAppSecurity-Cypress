/// <reference types="cypress" />

describe('Login', () => {

    it('Visit Url', () => {
        cy.visit('http://zero.webappsecurity.com')
        cy.get('div').should('contain', 'Home')
    });

    it('Verify user cant leaving username field empty', () => {
        cy.get('#signin_button').click()
        cy.url().should('include','login.html')

        cy.fixture("login").then(user => {
            const password = user.password

            cy.EmptyUsernameLogin(password)
        })
    });
})