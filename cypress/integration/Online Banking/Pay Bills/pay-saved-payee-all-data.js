import { loginValidData } from '../../Login/login-with-valid-data'


describe('Verify user can make pay saved payee with valid data', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Input valid data with saved validation',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee = pay.payee
            const account = pay.sp_account
            const amount = pay.amount
            const date = pay.date
            const description = pay.description

            cy.Pay_Saved_Payee(payee,account,amount,date,description)
        })
    })
})
