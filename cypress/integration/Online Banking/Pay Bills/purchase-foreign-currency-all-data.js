import { loginValidData } from '../../Login/login-with-valid-data'


describe('Verify user can make purchase foreign currency with valid data', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Input valid data with saved validation',() => {
        cy.fixture('pay-bills').then(pay => {
            const currency = pay.currency
            const amount = pay.amount

            cy.Purchase_Foreign_Currency(currency,amount)
        })
    })
})