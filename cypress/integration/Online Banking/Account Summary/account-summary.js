/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'


describe('Account Summary', () => {
    it('Verify user can access account summary page', () => {
        cy.AccountSummary()
    });

})