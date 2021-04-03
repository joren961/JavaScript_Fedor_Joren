describe('test form failed', () => {
    it('test input', () => {
        cy.visit('http://localhost:63342/JavaScript_Fedor_Joren/CROWDR_Joren_Fedor/HomePage.html?_ijt=i73sqvf6luoo7435k87avqfeeq');

        //fill form
        cy.get('.regioninput').should('be.visible').type('dragndropTest');
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


        cy.get('#Tent1').should('be.visible').drag('#10 10');
        cy.get('#Trashcan1').should('be.visible').drag('#4 4');
        cy.get('#Tree1').should('be.visible').drag('#2 2');

        cy.get('#lockButton').should('be.visible').click();

        cy.get('#startSimulation').should('be.visible');
    })
})