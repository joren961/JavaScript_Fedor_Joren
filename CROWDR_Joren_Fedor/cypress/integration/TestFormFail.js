describe('test form failed', () => {
    it('test input', () => {
        cy.visit('http://localhost:63342/JavaScript_Fedor_Joren/CROWDR_Joren_Fedor/HomePage.html?_ijt=i73sqvf6luoo7435k87avqfeeq');

        cy.get('.regioninput').should('be.visible');
        cy.get('.regionVisitorInput').should('be.visible').type('30');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.tents').should('be.visible').type('100');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.foodStands').should('be.visible').type('12');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.drinkStands').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.trees').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.toilets').should('be.visible').type('1');
        cy.get('.nextInput').should('be.visible').click();
        cy.get('.trash').should('be.visible').type('1');
        cy.get('#submit').should('be.visible').click();
        cy.get('#validationMessageMax').should('be.visible');
        cy.get('#validationMessageFilled').should('be.visible');
        cy.get('#validationMessageSpace').should('be.visible');

    })
})