import { loginValidData } from '../../Login/login-with-valid-data'


describe('Verify user can make pay saved payee when leaving Date field empty', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Input valid data, leaving date field empty',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee = pay.payee
            const account = pay.sp_account
            const amount = pay.amount
            const date = pay.date

            cy.EmptyDescription_Pay_Saved_Payee(payee,account,amount,date)
        })
    })
})
