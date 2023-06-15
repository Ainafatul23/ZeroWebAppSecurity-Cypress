/// <reference types="cypress" />

describe('Invalid Username Login', () => {

    it('Visit Url', () => {
        cy.visit('http://zero.webappsecurity.com')
        cy.get('div').should('contain', 'Home')
    });

    it('login with invalid username', () => {
        cy.get('#signin_button').click()
        cy.url().should('include','login.html')

        cy.fixture("login").then(user => {
            const username = user.invalid
            const password = user.password

            cy.Login(username,password)
        })
        cy.get('div.alert.alert-error')
        .should('exist')
        .invoke('text')
        .then((text) => {
            const expectedText = 'Login and/or password are wrong.';
            const actualText = text.trim();
            expect(actualText).to.equal(expectedText);
        })
    });
})