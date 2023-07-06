import { loginValidData } from '../../Login/login-with-valid-data'


describe('Pay Bills - Add New Payee', () => {
    it('Visit menu', () => {
        cy.Visit_Pay_Bills()
    });

    it('Verify user can add new payee when leaving payee details field empty',() => {
        cy.fixture('pay-bills').then(pay => {
            const payee_name = pay.payee_name
            const payee_address = pay.payee_address
            const account = pay.account

            cy.EmptyDetails_Add_New_Payee(payee_name,payee_address,account)
        })
    })
})
