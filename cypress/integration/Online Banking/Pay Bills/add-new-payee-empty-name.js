import { loginValidData } from '../../Login/login-with-valid-data'


describe('Pay Bills - Add New Payee', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Verify user cant add new payee when leaving  payee name field empty',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee_address = pay.payee_address
            const account = pay.account
            const payee_details = pay.description

            cy.EmptyName_Add_New_Payee(payee_address,account,payee_details)
        })
    })
})
