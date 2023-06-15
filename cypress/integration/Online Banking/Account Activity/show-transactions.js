/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'
require('./account-activity')

describe('Account Activity - Show Transactions', () => {
    it('Show Transactions', () => {
        cy.AccountActivity_ShowTrans()
    });

})