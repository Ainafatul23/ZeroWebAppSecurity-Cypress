import { loginValidData } from '../../Login/login-with-valid-data'


describe('Pay Bills - Add New Payee', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Verify user can add new payee',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee_name = pay.payee_name
            const payee_address = pay.payee_address
            const account = pay.account
            const payee_details = pay.description

            cy.Add_New_Payee(payee_name,payee_address,account,payee_details)
        })
    })
})
