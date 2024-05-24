describe('Site Magento', () => {
  it('Vérification accès site Magento', () => {
    cy.visit('https://magento.softwaretestingboard.com/');
    cy.get('.logo').should("be.visible");
    cy.get('[data-block="minicart"]').should("be.visible").click();
    cy.get('#ui-id-1').should("contain.text", "You have no items in your shopping cart.");
    cy.get('#btn-minicart-close').click({force:true});
    cy.get('[data-role="dropdownDialog"]').should("not.be.visible");
    cy.get("ul.header").should("contains.text", "Support This Project").and("contains.text", "Sign In").and("contains.text", "Create an Account");
    cy.contains("Create an Account").should("be.visible").click();
    cy.url().should('eq', "https://magento.softwaretestingboard.com/customer/account/create/");
  });

  it("Create an account", () => {

  });

  it("Sign In", () => {

  })
})