/// <reference types="cypress" />

const loginValidData = require('../Login/login-with-valid-data')

describe('Logout', () => {
    it('Verify that the user can successfully log out', () => {
        cy.Logout()
    });

})