/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'

describe('Online Statements', () => {
    it('Document and Statements', () => {
        cy.OnlineStatements()
    });

})