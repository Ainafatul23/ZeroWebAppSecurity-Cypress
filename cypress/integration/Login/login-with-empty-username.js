/// <reference types="cypress" />

describe('Empty Username Login', () => {

    it('Visit Url', () => {
        cy.visit('http://zero.webappsecurity.com')
        cy.get('div').should('contain', 'Home')
    });

    it('login', () => {
        cy.get('#signin_button').click()
        cy.url().should('include','login.html')

        cy.fixture("login").then(user => {
            const password = user.password

            cy.EmptyUsernameLogin(password)
        })
    });
})