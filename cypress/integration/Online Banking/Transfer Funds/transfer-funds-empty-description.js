/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'

describe('Transfer Funds', () => {
    it('Verify user can make transaction without description', () => {
        cy.fixture('transfer-funds').then(tf => {
            const amount = tf.amount
            cy.EmptyDescription_TransferFunds(amount)
        })
    });

})