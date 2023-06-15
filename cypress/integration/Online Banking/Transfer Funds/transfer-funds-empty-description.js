/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'

describe('Transfer Funds Empty Description', () => {
    it('verify', () => {
        cy.fixture('transfer-funds').then(tf => {
            const amount = tf.amount
            cy.EmptyDescription_TransferFunds(amount)
        })
    });

})