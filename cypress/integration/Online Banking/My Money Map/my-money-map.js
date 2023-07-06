/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'

describe('My Money Map', () => {
    it('Verify user can access my money map page', () => {
        cy.MoneyMap()
    });

})