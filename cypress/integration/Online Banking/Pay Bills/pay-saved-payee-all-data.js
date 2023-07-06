import { loginValidData } from '../../Login/login-with-valid-data'


describe('Pay Bills - Pay Saved Payee', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Verify user can make payment',() => {
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
