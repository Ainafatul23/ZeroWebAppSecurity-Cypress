// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('Login', (username,password) => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.get('#user_login').clear()
    cy.get('#user_login').type(username)

    cy.get('#user_password').clear()
    cy.get('#user_password').type(password)

    cy.get('#user_remember_me').check()

    cy.get('input[name="submit"]').click()

})

Cypress.Commands.add('EmptyUsernameLogin', (password) => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.get('#user_login').clear()
    cy.get('#user_password').clear()
    cy.get('#user_password').type(password)

    cy.get('#user_remember_me').check()

    cy.get('input[name="submit"]').click()

    cy.get('div.alert.alert-error')
    .should('exist')
    .invoke('text')
    .then((text) => {
        const expectedText = 'Login and/or password are wrong.';
        const actualText = text.trim();
        expect(actualText).to.equal(expectedText);
    })
})

Cypress.Commands.add('EmptyPasswordLogin', (username) => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.get('#user_login').clear()
    cy.get('#user_login').type(username)
    cy.get('#user_password').clear()

    cy.get('#user_remember_me').check()

    cy.get('input[name="submit"]').click()

    cy.get('div.alert.alert-error')
    .should('exist')
    .invoke('text')
    .then((text) => {
        const expectedText = 'Login and/or password are wrong.';
        const actualText = text.trim();
        expect(actualText).to.equal(expectedText);
    })
})

Cypress.Commands.add('Search',(keyword) => {
    cy.get('#searchTerm').type(keyword + '{enter}')

    cy.get('h2').contains('Search Results:')
    cy.get('a').contains('Zero - Personal Banking - Loans - Credit Cards')

})

Cypress.Commands.add('AccountSummary',() => {
    cy.get('h2').contains('Cash Accounts')
    cy.get('h2').contains('Investment Accounts')
    cy.get('h2').contains('Credit Accounts')
    cy.get('h2').contains('Loan Accounts')
})

Cypress.Commands.add('AccountActivity', () => {
    cy.get('a').contains('Account Activity').click()
    cy.url().should('include','account-activity.html')
    cy.get('a').should('contain','Show Transactions')
    cy.get('a').should('contain','Find Transactions')
})

Cypress.Commands.add('AccountActivity_ShowTrans', () => {
    cy.get('a').contains('Show Transactions').click()
    cy.get('h2').should('contain','Show Transactions')

    cy.get('#aa_accountId').select('6')
    cy.get('.well')
    .should('exist')
    .invoke('text')
    .then((text) => {
        const expectedText = 'No results.';
        const actualText = text.trim();
        expect(actualText).to.equal(expectedText);
    })

    cy.get('#aa_accountId').select('5')
    cy.get('.well')
    .should('exist')
    .invoke('text')
    .then((text) => {
        const expectedText = 'No results.';
        const actualText = text.trim();
        expect(actualText).to.equal(expectedText);
    })

    cy.get('#aa_accountId').select('4')
    cy.get('td').should('contain','RENT')

    cy.get('#aa_accountId').select('3')
    cy.get('td').should('contain','ONLINE TRANSFER REF #IGREKLVC0D')

    cy.get('#aa_accountId').select('2')
    cy.get('td').should('contain','CHECK DEPOSIT')

    cy.get('#aa_accountId').select('1') 
    cy.get('td').should('contain','OFFICE SUPPLY')

})

Cypress.Commands.add('AccountActivity_FindTrans', (description,datesfrom,datesto,amountfrom,amountto,type1) => {
    cy.get('a').contains('Find Transactions').click()
    cy.get('h2').should('contain','Find Transactions')

    cy.get('#aa_description').clear()
    cy.get('#aa_description').type(description)

    cy.get('#aa_fromDate').clear()
    cy.get('#aa_fromDate').type(datesfrom+'{enter}')

    cy.get('#aa_toDate').clear()
    cy.get('#aa_toDate').type(datesto+'{enter}')

    cy.get('#aa_fromAmount').clear()
    cy.get('#aa_fromAmount').type(amountfrom)

    cy.get('#aa_toAmount').clear()
    cy.get('#aa_toAmount').type(amountto)

    cy.get('#aa_type').select(type1)

    cy.get('button.btn.btn-primary').contains('Find').click()

    cy.wait(5000)
    cy.get('td').should(($td) => {
        const tdContent = $td.text();
        expect(tdContent).to.include(description);
      })
    cy.get('table tbody tr td:nth-child(3)').should(($td) => {
        const depositValue = parseInt($td.text().trim(), 10);
        expect(depositValue).to.be.within(Number(amountfrom), Number(amountto));
    })
})

Cypress.Commands.add('AccountActivity_FindTrans_Description', (description) => {
    cy.get('a').contains('Find Transactions').click()
    cy.get('h2').should('contain','Find Transactions')

    cy.get('#aa_description').clear()
    cy.get('#aa_description').type(description)

    cy.get('#aa_fromAmount').clear()
    cy.get('#aa_toAmount').clear()

    cy.get('button.btn.btn-primary').contains('Find').click()
    cy.wait(5000)
    cy.get('td').should(($td) => {
        const tdContent = $td.text();
        expect(tdContent).to.include(description);
      })
})

Cypress.Commands.add('AccountActivity_FindTrans_Dates', (datesfrom,datesto) => {
    cy.get('a').contains('Find Transactions').click()
    cy.get('h2').should('contain','Find Transactions')

    cy.get('#aa_description').clear()

    cy.get('#aa_fromDate').clear()
    cy.get('#aa_fromDate').type(datesfrom+'{enter}')

    cy.get('#aa_toDate').clear()
    cy.get('#aa_toDate').type(datesto+'{enter}')

    cy.get('#aa_fromAmount').clear()
    cy.get('#aa_toAmount').clear()

    cy.get('button.btn.btn-primary').contains('Find').click()
    cy.get('td').should(($td) => {
        const tdContent = $td.text();
        expect(tdContent).to.include(datesfrom);
      })
      cy.get('td').should(($td) => {
        const tdContent = $td.text();
        expect(tdContent).to.include(datesto);
      })

})

Cypress.Commands.add('AccountActivity_FindTrans_Amount', (amountfrom,amountto) => {
    cy.get('a').contains('Find Transactions').click()
    cy.get('h2').should('contain','Find Transactions')

    cy.get('#aa_description').clear()

    cy.get('#aa_fromAmount').clear()
    cy.get('#aa_fromAmount').type(amountfrom)

    cy.get('#aa_toAmount').clear()
    cy.get('#aa_toAmount').type(amountto)

    cy.get('button.btn.btn-primary').contains('Find').click()
   
    cy.get('table tbody tr td:nth-child(3)').should(($td) => {
        const depositValue = parseInt($td.text().trim(), 10);
        expect(depositValue).to.be.within(Number(amountfrom), Number(amountto));
    })
})

Cypress.Commands.add('AccountActivity_FindTrans_Type', (type1,type2,type3) => {
    cy.get('a').contains('Find Transactions').click()
    cy.get('h2').should('contain','Find Transactions')

    cy.get('#aa_description').clear()

    cy.get('#aa_fromAmount').clear()
    cy.get('#aa_toAmount').clear()

    //Any
    cy.get('#aa_type').select(type1)
    cy.get('button.btn.btn-primary').contains('Find').click()
    cy.get('td').should('contain','2012-09-06')
    cy.get('td').should('contain','2012-09-05')
    cy.get('td').should('contain','2012-09-01')
    
    //Deposit
    cy.get('#aa_type').select(type2)
    cy.get('button.btn.btn-primary').contains('Find').click()
    cy.get('table tbody tr td:nth-child(3)').should(($td) => {
        const depositValue = $td.text().trim();
        expect(depositValue).to.not.be.empty;
      })
    
    //Withdraw
    cy.get('#aa_type').select(type3)
    cy.get('button.btn.btn-primary').contains('Find').click()
    cy.get('table tbody tr td:nth-child(4)').should(($td) => {
        const withdrawalValue = $td.text().trim();
        expect(withdrawalValue).to.not.be.empty;
      })
})

Cypress.Commands.add('EmptyAmount_TransferFunds',(description
    ) => {
    cy.get('a').contains('Transfer Funds').click()
    cy.url().should('include','transfer-funds.html')
    cy.get('h2').should('contain','Transfer Money & Make Payments')

    cy.get('#tf_fromAccountId').select('6')
    cy.get('#tf_toAccountId').select('5')

    cy.get('#tf_amount').clear()

    cy.get('#tf_description').clear()
    cy.get('#tf_description').type(description)

    cy.get('#btn_submit').click()

    cy.get('h2').should('contain','Transfer Money & Make Payments')
})

Cypress.Commands.add('EmptyDescription_TransferFunds',(amount) => {
    cy.get('a').contains('Transfer Funds').click()
    cy.url().should('include','transfer-funds.html')
    cy.get('h2').should('contain','Transfer Money & Make Payments')

    cy.get('#tf_fromAccountId').select('4')
    cy.get('#tf_fromAccountId').invoke('val').then((selectedOptionValue) => {
        cy.get('#tf_fromAccountId').find('option[value="' + selectedOptionValue + '"]').invoke('text').then((text) => {
          const loanText = text.trim().split('(')[0].trim()
          cy.wrap(loanText).as('loanText');
        })
    })

    cy.get('#tf_toAccountId').select('3')
    cy.get('#tf_toAccountId').invoke('val').then((selectedOptionValue) => {
        cy.get('#tf_toAccountId').find('option[value="' + selectedOptionValue + '"]').invoke('text').then((text) => {
          const savingsText = text.trim().split('(')[0].trim();
          cy.wrap(savingsText).as('savingsText')
        })
    })

    cy.get('#tf_amount').clear()
    cy.get('#tf_amount').type(amount)
    .invoke('val').then((amountText) => {
        cy.wrap(amountText).as('amountText') 
      }) 

    cy.get('#tf_description').clear()
    
    cy.get('#btn_submit').click()

    //Transfer Money & Make Payments - Verify

    cy.get('h2').should('contain','Transfer Money & Make Payments - Verify')
    cy.url().should('include','transfer-funds-verify.html')

    //Loan
    cy.get('@loanText').then((loanText) => {
        cy.get('#tf_fromAccountId')
          .should('have.value', loanText)
    })
      
    //Savings
    cy.get('@savingsText').then((savingsText) => {
        cy.get('#tf_toAccountId')
          .should('have.value', savingsText)
    })
    //amount
    cy.get('@amountText').then((amountText) => {
        cy.get('#tf_amount')
          .should('have.value', amountText)
      })

    cy.get('#btn_submit').click()
   
    // Transfer Money & Make Payments - Confirm
    cy.get('h2').should('contain', 'Transfer Money & Make Payments - Confirm')
    cy.url().should('include','transfer-funds-confirm.html')
    cy.wait(3000)
    cy.get('div.alert.alert-success')
    .should('exist')
    .invoke('text')
    .then((text) => {
        const expectedText = 'You successfully submitted your transaction.';
        const actualText = text.trim();
        expect(actualText).to.equal(expectedText);
    })

})

Cypress.Commands.add('TransferFunds',(amount,description) => {
    cy.get('a').contains('Transfer Funds').click()
    cy.url().should('include','transfer-funds.html')
    cy.get('h2').should('contain','Transfer Money & Make Payments')

    cy.get('#tf_fromAccountId').select('2')
    cy.get('#tf_fromAccountId').invoke('val').then((selectedOptionValue) => {
        cy.get('#tf_fromAccountId').find('option[value="' + selectedOptionValue + '"]').invoke('text').then((text) => {
          const checkingText = text.trim().split('(')[0].trim()
          cy.wrap(checkingText).as('checkingText');
        })
    })

    cy.get('#tf_toAccountId').select('1')
    cy.get('#tf_toAccountId').invoke('val').then((selectedOptionValue) => {
        cy.get('#tf_toAccountId').find('option[value="' + selectedOptionValue + '"]').invoke('text').then((text) => {
          const savingsText = text.trim().split('(')[0].trim();
          cy.wrap(savingsText).as('savingsText')
        })
    })

    cy.get('#tf_amount').clear()
    cy.get('#tf_amount').type(amount)
    .invoke('val').then((amountText) => {
        cy.wrap(amountText).as('amountText') 
      }) 
    
    cy.get('#tf_description').clear()
    cy.get('#tf_description').type(description)
    .invoke('val').then((descriptionText) => {
        cy.wrap(descriptionText).as('descriptionText') 
      }) 

    cy.get('#btn_submit').click()

    // Transfer Money & Make Payments - Verify

    cy.get('h2').should('contain','Transfer Money & Make Payments - Verify')
    cy.url().should('include','transfer-funds-verify.html')
    //Checking
    cy.get('@checkingText').then((checkingText) => {
        cy.get('#tf_fromAccountId')
          .should('have.value', checkingText)
    })
      
    //Savings
    cy.get('@savingsText').then((savingsText) => {
        cy.get('#tf_toAccountId')
          .should('have.value', savingsText)
    })
    //amount
    cy.get('@amountText').then((amountText) => {
        cy.get('#tf_amount')
          .should('have.value', amountText)
      })
    //description tf_description
    cy.get('@descriptionText').then((descriptionText) => {
        cy.get('#tf_description')
        .should('have.value', descriptionText)
     })

    cy.get('#btn_submit').click()
   
    // Transfer Money & Make Payments - Confirm
    cy.get('h2').should('contain', 'Transfer Money & Make Payments - Confirm')
    cy.url().should('include','transfer-funds-confirm.html')
    cy.wait(3000)
    cy.get('div.alert.alert-success')
    .should('exist')
    .invoke('text')
    .then((text) => {
        const expectedText = 'You successfully submitted your transaction.';
        const actualText = text.trim();
        expect(actualText).to.equal(expectedText);
    })
    
})

Cypress.Commands.add('Visit_Pay_Bills', () => {
    cy.get('a').contains('Pay Bills').click()
    cy.url().should('include','pay-bills.html')
})

Cypress.Commands.add('Pay_Saved_Payee', (payee,account,amount,date,description) => {
    cy.get('a').contains('Pay Saved Payee').click()
    cy.get('h2').should('contain','Make payments to your saved payees')

    cy.get('#sp_payee').select(payee)

    cy.get('#sp_account').select(account)

    cy.get('#sp_amount').clear()
    cy.get('#sp_amount').type(amount)

    cy.get('#sp_date').clear()
    cy.get('#sp_date').type(date+'{enter}')

    cy.get('#sp_description').clear()
    cy.get('#sp_description').type(description)

    cy.get('#pay_saved_payees').click()

    cy.get('span').should('contain','The payment was successfully submitted.')
})

Cypress.Commands.add('EmptyDate_Pay_Saved_Payee', (payee,account,amount,description) => {
    cy.get('a').contains('Pay Saved Payee').click()
    cy.get('h2').should('contain','Make payments to your saved payees')

    cy.get('#sp_payee').select(payee)

    cy.get('#sp_account').select(account)

    cy.get('#sp_amount').clear()
    cy.get('#sp_amount').type(amount)

    cy.get('#sp_date').clear()

    cy.get('#sp_description').clear()
    cy.get('#sp_description').type(description)

    cy.get('#pay_saved_payees').click()

    cy.get('div.alert_content').should('not.exist')
})

Cypress.Commands.add('EmptyDescription_Pay_Saved_Payee', (payee,account,amount,date) => {
    cy.get('a').contains('Pay Saved Payee').click()
    cy.get('h2').should('contain','Make payments to your saved payees')

    cy.get('#sp_payee').select(payee)

    cy.get('#sp_account').select(account)

    cy.get('#sp_amount').clear()
    cy.get('#sp_amount').type(amount)

    cy.get('#sp_date').clear()
    cy.get('#sp_date').type(date+'{enter}')

    cy.get('#sp_description').clear()

    cy.get('#pay_saved_payees').click()

    cy.get('span').should('contain','The payment was successfully submitted.')
})

Cypress.Commands.add('EmptyDate_Pay_Saved_Payee', (payee,account,date,description) => {
    cy.get('a').contains('Pay Saved Payee').click()
    cy.get('h2').should('contain','Make payments to your saved payees')

    cy.get('#sp_payee').select(payee)

    cy.get('#sp_account').select(account)

    cy.get('#sp_amount').clear()

    cy.get('#sp_date').clear()
    cy.get('#sp_date').type(date+'{enter}')

    cy.get('#sp_description').clear()
    cy.get('#sp_description').type(description)

    cy.get('#pay_saved_payees').click()

    cy.get('div.alert_content').should('not.exist')
})

Cypress.Commands.add('Add_New_Payee', (payee_name,payee_address,account,payee_details) => {
    cy.get('a').contains('Add New Payee').click()
    cy.get('h2').should('contain','Who are you paying?')

    cy.get('#np_new_payee_name').clear()
    cy.get('#np_new_payee_name').type(payee_name)
    .invoke('val').then((nameText) => {
        cy.wrap(nameText).as('nameText') 
      }) 

    cy.get('#np_new_payee_address').clear()
    cy.get('#np_new_payee_address').type(payee_address)

    cy.get('#np_new_payee_account').clear()
    cy.get('#np_new_payee_account').type(account)

    cy.get('#np_new_payee_details').clear()
    cy.get('#np_new_payee_details').type(payee_details)

    cy.get('#add_new_payee').click()
    cy.wait(3000)
    cy.get('@nameText').then((nameText) => {
        cy.get('div#alert_content')
          .invoke('text')
          .should('include', nameText);
      });
})

Cypress.Commands.add('EmptyName_Add_New_Payee',(payee_address,account,payee_details) => {
    cy.get('a').contains('Add New Payee').click()
    cy.get('h2').should('contain','Who are you paying?')

    cy.get('#np_new_payee_name').clear()

    cy.get('#np_new_payee_address').clear()
    cy.get('#np_new_payee_address').type(payee_address)

    cy.get('#np_new_payee_account').clear()
    cy.get('#np_new_payee_account').type(account)

    cy.get('#np_new_payee_details').clear()
    cy.get('#np_new_payee_details').type(payee_details)

    cy.get('#add_new_payee').click()
    cy.wait(3000)

    cy.get('h2').should('contain','Who are you paying?')
})

Cypress.Commands.add('EmptyAddress_Add_New_Payee',(payee_name,account,payee_details) => {
    cy.get('a').contains('Add New Payee').click()
    cy.get('h2').should('contain','Who are you paying?')

    cy.get('#np_new_payee_name').clear()
    cy.get('#np_new_payee_name').type(payee_name)

    cy.get('#np_new_payee_address').clear()

    cy.get('#np_new_payee_account').clear()
    cy.get('#np_new_payee_account').type(account)

    cy.get('#np_new_payee_details').clear()
    cy.get('#np_new_payee_details').type(payee_details)

    cy.get('#add_new_payee').click()
    cy.wait(3000)

    cy.get('h2').should('contain','Who are you paying?')
})

Cypress.Commands.add('EmptyAccount_Add_New_Payee',(payee_name,payee_address,payee_details) => {
    cy.get('a').contains('Add New Payee').click()
    cy.get('h2').should('contain','Who are you paying?')

    cy.get('#np_new_payee_name').clear()
    cy.get('#np_new_payee_name').type(payee_name)

    cy.get('#np_new_payee_address').clear()
    cy.get('#np_new_payee_address').type(payee_address)

    cy.get('#np_new_payee_account').clear()

    cy.get('#np_new_payee_details').clear()
    cy.get('#np_new_payee_details').type(payee_details)

    cy.get('#add_new_payee').click()
    cy.wait(3000)

    cy.get('h2').should('contain','Who are you paying?')
})

Cypress.Commands.add('EmptyDetails_Add_New_Payee', (payee_name,payee_address,account) => {
    cy.get('a').contains('Add New Payee').click()
    cy.get('h2').should('contain','Who are you paying?')

    cy.get('#np_new_payee_name').clear()
    cy.get('#np_new_payee_name').type(payee_name)
    .invoke('val').then((nameText) => {
        cy.wrap(nameText).as('nameText') 
      }) 

    cy.get('#np_new_payee_address').clear()
    cy.get('#np_new_payee_address').type(payee_address)

    cy.get('#np_new_payee_account').clear()
    cy.get('#np_new_payee_account').type(account)

    cy.get('#np_new_payee_details').clear()

    cy.get('#add_new_payee').click()
    cy.wait(3000)
    cy.get('@nameText').then((nameText) => {
        cy.get('div#alert_content')
          .invoke('text')
          .should('include', nameText);
      });
})

Cypress.Commands.add('Purchase_Foreign_Currency', (currency,amount) => {
    cy.get('a').contains('Purchase Foreign Currency').click()
    cy.get('h2').should('contain','Purchase foreign currency cash')

    cy.get('#pc_currency').select(currency)
    cy.get('strong').should('contain',"Today's Sell Rate:")
    cy.get('span#sp_sell_rate')
    .should('contain.text', currency)
    .should('be.visible');

    cy.get('#pc_amount').clear()
    cy.get('#pc_amount').type(amount)

    cy.get('#pc_inDollars_true').click()

    cy.get('#pc_calculate_costs').click()
    cy.get('#pc_conversion_amount').should('exist')

    cy.get('#purchase_cash').click()
    cy.get('div#alert_content').should('contain','Foreign currency cash was successfully purchased.')

})

Cypress.Commands.add('MoneyMap', () => {
    cy.get('a').contains('My Money Map').click()

    cy.url().should('include','money-map.html')
    cy.get('tspan').should('contain','OutFlow Chart')
    cy.get('#report-1010_header_hd-textEl').should('contain','Inflow')
    cy.get('#report-1016_header_hd-textEl').should('contain','OutFlow')
    cy.get('#report-1022_header_hd-textEl').should('contain','Payments to Zero bank credit cards')
    cy.get('#summaryReport_header_hd-textEl').should('contain','Summary')
    
})

Cypress.Commands.add('OnlineStatements', () => {
    cy.get('a').contains('Online Statements').click()

    cy.url().should('include','online-statements.html')
    cy.get('h2').should('contain','Statements & Documents')

    //Brokerage
    cy.get('#os_accountId').select('6')
    cy.get('h2').should('contain','Account - Brokerage')

    //Account - Credit Card
    cy.get('#os_accountId').select('5')
    cy.get('h2').should('contain','Account - Credit Card')

    //Loan
    cy.get('#os_accountId').select('4')
    cy.get('h2').should('contain','Account - Loan')

    //Savings
    cy.get('#os_accountId').select('3')
    cy.get('h2').should('contain','Account - Savings')

    //Checking
    cy.get('#os_accountId').select('2')
    cy.get('h2').should('contain','Account - Checking')

    //Savings
    cy.get('#os_accountId').select('1')
    cy.get('h2').should('contain','Account - Savings')

    //Recent Statements
    //2009
    cy.get('a').contains('2009').click()
    cy.get('a').should('contain','Statement 31/11/09(57K)')
    cy.get('a').should('contain','Statement 16/10/09(57K)')

    //2010
    cy.get('a').contains('2010').click()
    cy.get('a').should('contain','Statement 01/12/10(57K)')
    cy.get('a').should('contain','Statement 04/09/10(57K)')

    //2011
    cy.get('a').contains('2011').click()
    cy.get('a').should('contain','Statement 05/12/11(57K)')
    cy.get('a').should('contain','Statement 22/06/11(57K)')

    //2012
    cy.get('a').contains('2012').click()
    cy.get('a').should('contain','Statement 01/10/12(57K)')

})

Cypress.Commands.add('Help',() => {
   cy.get('.dropdown-toggle').contains('Settings').click()
   cy.get('#help_link').click()

   cy.url().should('include','help.html')
   cy.get('h3').should('contain','Help Topics')
})

Cypress.Commands.add('Logout', () => {
    cy.get('.dropdown-toggle').contains('username').click()
    cy.get('#logout_link').click()

    cy.url().should('include','index.html')

    cy.get('#signin_button')
    .should('exist')
    .invoke('text')
    .then((text) => {
        const expectedText = 'Signin';
        const actualText = text.trim();
        expect(actualText).to.equal(expectedText);
    })
})

