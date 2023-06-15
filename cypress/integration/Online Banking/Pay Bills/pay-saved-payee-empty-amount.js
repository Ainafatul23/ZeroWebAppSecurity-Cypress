import { loginValidData } from '../../Login/login-with-valid-data'


describe('Verify user can make pay saved payee when leaving amount field empty', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Input valid data, leaving amount field empty',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee = pay.payee
            const account = pay.sp_account
            const date = pay.date
            const description = pay.description

            cy.EmptyAmount_Pay_Saved_Payee(payee,account,date,description)
        })
    })
})
