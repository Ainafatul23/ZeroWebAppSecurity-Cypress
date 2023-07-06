import { loginValidData } from '../../Login/login-with-valid-data'


describe('Pay Bills - Add New Payee', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Verify user cant add new payee when leaving  account field empty',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee_name = pay.payee_name
            const payee_address = pay.payee_address
            const payee_details = pay.description

            cy.EmptyAccount_Add_New_Payee(payee_name,payee_address,payee_details)
        })
    })
})
