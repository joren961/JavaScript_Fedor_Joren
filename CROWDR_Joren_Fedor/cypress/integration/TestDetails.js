describe('test details', () => {
    it('test detailInput', () => {
        cy.visit('http://localhost:63342/JavaScript_Fedor_Joren/CROWDR_Joren_Fedor/HomePage.html?_ijt=d7n2cj60b96m1eg4iv9labmba0');

        //form filled
        cy.get('.regioninput').should('be.visible').type('detailstest');
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
        cy.get('#submit').should('be.visible').click();

        //select item and add details
        cy.get('#Tent1').should('be.visible').click();
        cy.get('.detailsBox').should('be.visible');
        cy.get('.MaxVisitors').should('be.visible').type('10');
        cy.get('#TentOpeningTime').should('be.visible').type('10:00');
        cy.get('#apply').should('be.visible').click();

        cy.get('#Tree1').should('be.visible').click();
        cy.get('.detailsBox').should('be.visible');
        cy.get('.TreeRadio').should('be.visible');

        cy.get('#Trashcan1').should('be.visible').click();
        cy.get('.TrashCapacity').should('be.visible').type('10');
        cy.get('#TrashEmptyTime').should('be.visible').type('10:00');
        cy.get('#apply').should('be.visible').click();


        //re open details to see if the values are still active
        cy.get('#Tent1').should('be.visible').click();
        cy.get('.MaxVisitors').should('have.value','10');
        cy.get('#TentOpeningTime').should('have.value','10:00');

        cy.get('#Trashcan1').should('be.visible').click();
        cy.get('.TrashCapacity').should('have.value','10');
        cy.get('#TrashEmptyTime').should('have.value','10:00');
    })
})