/// <reference types="cypress" />
import { loginValidData } from '../../Login/login-with-valid-data'

describe('Transfer Funds', () => {
    it('Verify user cant leaving amount field empty', () => {
        cy.fixture('transfer-funds').then(tf => {
            const description = tf.description

            cy.EmptyAmount_TransferFunds(description)
        })
    });

})