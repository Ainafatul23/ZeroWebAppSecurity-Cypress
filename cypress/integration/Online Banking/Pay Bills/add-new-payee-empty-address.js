import { loginValidData } from '../../Login/login-with-valid-data'


describe('Pay Bills - Add New Payee', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Verify user cant add new payee when leaving  payee address field empty',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee_name = pay.payee_name
            const account = pay.account
            const payee_details = pay.description

            cy.EmptyAddress_Add_New_Payee(payee_name,account,payee_details)
        })
    })
})
