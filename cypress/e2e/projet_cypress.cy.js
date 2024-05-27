describe('Site Magento', () => {
  let userInfos = require('../fixtures/info.json')

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
    cy.visit("https://magento.softwaretestingboard.com/customer/account/create/");
    cy.get("#firstname").type(userInfos.firstname).should("have.value",userInfos.firstname);
    cy.get("#lastname").type(userInfos.lastname).should("have.value", userInfos.lastname);
    cy.get("#email_address").type(userInfos.email).should("have.value",userInfos.email);
    cy.get("#password").type(userInfos.password).should("have.value", userInfos.password);
    cy.get("#password-confirmation").type(userInfos.password).should("have.value", userInfos.password);
    cy.get("#form-validate > .actions-toolbar > div.primary").click();
    cy.url().should("include","/customer/account/");
    cy.get(".message-success").should("be.visible").and ("contains.text","Thank you for registering with Main Website Store.");
    cy.get(".box-content").should("contains.text", userInfos.firstname).and("contains.text", userInfos.lastname).and("contains.text", userInfos.email);
  });

  it("Sign In", () => {

  })
})