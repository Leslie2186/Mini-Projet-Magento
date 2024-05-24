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

  it.only("Create an account", () => {
    cy.visit("https://magento.softwaretestingboard.com/customer/account/create/");
    cy.get("#firstname").type("Emma").should("have.value","Emma");
cy.get("#lastname").type("Dupont").should("have.value","Dupont");
cy.get("#email_address").type("EmmaDupont11@gmail.com").should("have.value","EmmaDupont11@gmail.com");
cy.get("#password").type("Emma1234@").should("have.value","Emma1234@");
cy.get("#password-confirmation").type("Emma1234@").should("have.value","Emma1234@");
cy.get("#form-validate > .actions-toolbar > div.primary").click();
cy.url().should("include","/customer/account/");
cy.get(".message-success").should("be.visible").and ("contains.text","Thank you for registering with Main Website Store.");
cy.get(".box-content").should("contains.text","Emma").and("contains.text","Dupont").and("contains.text","EmmaDupont11@gmail.com");


  });

  it("Sign In", () => {

  })
})