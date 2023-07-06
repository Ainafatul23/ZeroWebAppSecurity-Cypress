/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'
require('./account-activity')

describe('Account Activity - Find Transactions', () => {
    it('Verify can show all data based on description', () => {
        cy.fixture('find-transaction').then(trans => {
            const description = trans.description

            cy.AccountActivity_FindTrans_Description(description)
        })
    })
})