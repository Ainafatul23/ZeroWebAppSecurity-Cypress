import { loginValidData } from '../../Login/login-with-valid-data'


describe('Pay Bills - Purchase Foreign Currency', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Verify user can calculate Conversion Amount and Purchase foreign currency cash',() => {
        cy.fixture('pay-bills').then(pay => {
            const currency = pay.currency
            const amount = pay.amount

            cy.Purchase_Foreign_Currency(currency,amount)
        })
    })
})