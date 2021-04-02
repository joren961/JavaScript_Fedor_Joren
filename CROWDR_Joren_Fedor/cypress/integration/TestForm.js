describe('test form', () => {
    it('test input', () => {
        cy.visit('http://localhost:63342/JavaScript_Fedor_Joren/CROWDR_Joren_Fedor/HomePage.html?_ijt=935p3uat33i1sv8fqlu5erafk4');

        cy.get('.regioninput').should('be.visible').type('regio naam');
        cy.get('.regionVisitorInput').should('be.visible').type('30');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.tents').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.foodStands').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.drinkStands').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.trees').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.toilets').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.trash').should('be.visible').type('1');
        cy.get('.squaresLeft').should('have.text','209');
        cy.get('#submit').should('be.visible').click();

    })
})