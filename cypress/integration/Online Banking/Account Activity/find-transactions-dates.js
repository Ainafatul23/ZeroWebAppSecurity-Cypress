/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'
require('./account-activity')

describe('Account Activity - Find Transactions', () => {
    it('Verify can show all data based on dates between', () => {
        cy.fixture('find-transaction').then(find => {
            const datesfrom = find.datesfrom
            const datesto = find.datesto

            cy.AccountActivity_FindTrans_Dates(datesfrom,datesto)
        })
    })
})