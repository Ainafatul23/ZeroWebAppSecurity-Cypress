/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'

describe('Transfer Funds All Data', () => {
    it('verify', () => {
        cy.fixture('transfer-funds').then(tf => {
            const amount = tf.amount
            const description = tf.description

            cy.TransferFunds(amount,description)
        })
    });

})