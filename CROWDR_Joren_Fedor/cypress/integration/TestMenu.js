describe('test menu functions', () => {
    it('test links', () => {
        cy.visit('http://localhost:63342/JavaScript_Fedor_Joren/CROWDR_Joren_Fedor/HomePage.html?_ijt=oibponmvnpnld8e48iitno52h7');

        cy.get('.hamburgerLink').should('be.visible').click();
        cy.get('#createRegionLink').should('be.visible');

        cy.get('.regioninput').should('be.visible').type('menutest');
        cy.get('.regionVisitorInput').should('be.visible').type('30');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.tents').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.trees').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.trash').should('be.visible').type('1');
        cy.get('#submit').should('be.visible').click();

        cy.get('#menutest').should('be.visible');
        cy.get('#createRegionLink').should('be.visible').click();
        cy.get('.regioninput').should('be.visible');
        cy.get('#menutest').click();
        cy.get('#Tent1').should('be.visible');

    })
})