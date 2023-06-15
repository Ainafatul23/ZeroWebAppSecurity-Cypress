/// <reference types="cypress" />
const loginValidData = require('../Login/login-with-valid-data')

describe('Settings-Help', () => {
    it('Help', () => {
        cy.Help()
    });

})