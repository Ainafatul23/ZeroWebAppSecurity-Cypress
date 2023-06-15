/// <reference types="cypress" />

describe('Search', () => {
    it('Visit Url', () => {
        cy.visit('http://zero.webappsecurity.com')
        cy.get('div').should('contain', 'Home')
    });

    it('Search', () => {
        cy.fixture("search").then(key => {
            const keyword = key.keyword

            cy.Search(keyword)
        })
    });

})