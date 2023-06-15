/// <reference types="cypress" />

const loginValidData = require('../Login/login-with-valid-data')

describe('Logout', () => {
    it('Logout', () => {
        cy.Logout()
    });

})