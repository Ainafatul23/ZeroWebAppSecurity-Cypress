/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'
require('./account-activity')

describe('Account Activity - Find Transactions', () => {
    it('Verify can show all data based on all data', () => {
        cy.fixture('find-transaction').then(trans => {
            const description = trans.description
            const datesfrom = find.datesfrom
            const datesto = find.datesto
            const amountfrom = find.amountfrom
            const amountto = find.amountto
            const type1 = find.type1

            cy.AccountActivity_FindTrans(description, datesfrom, datesto, amountfrom, amountto, type1)
        })
    })

})