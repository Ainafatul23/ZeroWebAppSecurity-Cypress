import { loginValidData } from '../../Login/login-with-valid-data'


describe('Verify user can add new payee with valid data', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Input valid data with saved validation',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee_name = pay.payee_name
            const payee_address = pay.amount
            const account = pay.account
            const payee_details = pay.description

            cy.Add_New_Payee(payee_name,payee_address,account,payee_details)
        })
    })
})
