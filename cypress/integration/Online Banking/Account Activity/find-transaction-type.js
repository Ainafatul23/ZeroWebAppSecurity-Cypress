/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'
require('./account-activity')

describe('Account Activity - Find Transactions', () => {
    it('Verify can show all data based on Type', () => {
        cy.fixture('find-transaction').then(find => {
            const type1 = find.type1
            const type2 = find.type2
            const type3 = find.type3

            cy.AccountActivity_FindTrans_Type(type1,type2,type3)
        })
    })
})