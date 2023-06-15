/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'


describe('Account Summary', () => {
    it('Account Summary', () => {
        cy.AccountSummary()
    });

})