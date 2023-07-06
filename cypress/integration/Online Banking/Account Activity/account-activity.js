/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'


describe('Account Activity', () => {
    it('Verify user can access Account Activity Page', () => {
        cy.AccountActivity()
    });

})
