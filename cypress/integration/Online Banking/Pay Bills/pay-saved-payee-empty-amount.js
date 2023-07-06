import { loginValidData } from '../../Login/login-with-valid-data'


describe('Pay Bills - Pay Saved Payee', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Verify user cant make payment when leaving amount field empty',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee = pay.payee
            const account = pay.sp_account
            const date = pay.date
            const description = pay.description

            cy.EmptyAmount_Pay_Saved_Payee(payee,account,date,description)
        })
    })
})
