describe('FormTest', function () {
    it('test all inputs', function () {
        cy.visit('http://localhost:63342/JavaScript_Fedor_Joren/CROWDR_Joren_Fedor/HomePage.html?_ijt=h01kr52vebf4otiblagsf6lc59');
        cy.get('.regioninput').should('be.visible').type('regio naam')
        cy.get('.nextInput').click();
        cy.url().should('be.visible');
    });
})