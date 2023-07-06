/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'

describe('Online Statements', () => {
    it('Verify that selecting account displayed statement and documents accordingly', () => {
        cy.OnlineStatements()
    });

})