/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'

describe('My Money Map', () => {
    it('Money Map', () => {
        cy.MoneyMap()
    });

})