/// <reference types="cypress" />
const loginValidData = require('../Login/login-with-valid-data')

describe('Settings-Help', () => {
    it('Verify user can access help page', () => {
        cy.Help()
    });

})