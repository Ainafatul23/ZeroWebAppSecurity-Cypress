/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'
require('./account-activity')

describe('Account Activity - Show Transactions', () => {
    it('Verify that selecting account displayed transaction data accordingly', () => {
        cy.AccountActivity_ShowTrans()
    });

})