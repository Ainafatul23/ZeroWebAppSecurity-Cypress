/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'
require('./account-activity')

describe('Account Activity - Find Transactions', () => {
    it('Verify can show all data based on amount between', () => {
        cy.fixture('find-transaction').then(find => {
            const amountfrom = find.amountfrom
            const amountto = find.amountto

            cy.AccountActivity_FindTrans_Amount(amountfrom,amountto)
        })
    })
})