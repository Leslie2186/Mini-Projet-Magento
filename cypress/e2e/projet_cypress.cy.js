describe('Site Magento', () => {
  let userInfos = require('../fixtures/info.json');

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
    cy.get('.page-title').should("be.visible").and ("contains.text","My Account");
    cy.get(".box-content").should("contains.text", userInfos.firstname).and("contains.text", userInfos.lastname).and("contains.text", userInfos.email);
  });

  it.only("Sign In", () => {
    cy.visit("https://magento.softwaretestingboard.com/customer/account/login");
    cy.wait(3000);
    cy.get("#email").type(userInfos.email).should("have.value",userInfos.email);
    cy.get("#pass").type(userInfos.password).should("have.value",userInfos.password);
    cy.get("#send2").click();
    cy.url().should("contain", "https://magento.softwaretestingboard.com/customer/account/"); 
    cy.get(".welcome").should("contains.text",`Welcome, ${userInfos.firstname} ${userInfos.lastname}!`);
    cy.get("#ui-id-8").click();
    cy.url().should('contain', "https://magento.softwaretestingboard.com/sale.html");
    cy.wait(3000);
    cy.get('[href="https://magento.softwaretestingboard.com/gear/bags.html"]').contains("Bags").click({force: true});
    cy.wait(10000);
    cy.url().should('contain', "https://magento.softwaretestingboard.com/gear/bags.html");
    cy.get('[href="https://magento.softwaretestingboard.com/driven-backpack.html"]').should("contains.text", "Driven Backpack").click({ multiple: true });
    cy.url().should('contain', "https://magento.softwaretestingboard.com/driven-backpack.html");
    cy.wait(3000);
    cy.get("button").eq(7).should("be.visible").click();
    cy.get('[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').should("be.visible").and("contains.text", "You added Driven Backpack to your shopping cart");
    cy.get('[data-bind="scope: "minicart_content"]').click();
    cy.get("#top-cart-btn-checkout").click();
    cy.url().should('contain', "https://magento.softwaretestingboard.com/checkout/#shipping");
    cy.get("#CNFERT5").should("contains.text",`${userInfos.firstname}`);
    cy.get("#EOJAQV0").should("contains.text",`${userInfos.lastname}`);
    cy.get("#SB5K59W").type(userInfos.address).should("have.value",`${userInfos.address}`);
    cy.get("#N54A1MC").type(userInfos.city).should("have.value",`${userInfos.city}`);
    cy.get("#EBYU3G2").select("California");  
    cy.get("#OSTAIL4").type(userInfos.postcode).should("have.value",`${userInfos.postcode}`);
    cy.get("#EBYU3G2").select("United States");  
    cy.get("#NLIB5JC").type(userInfos.phone_number).should("have.value",`${userInfos.phone_number}`);
    cy.get("#checkout-shipping-method-load > [data-bind='text: getFormattedPrice(method.price_excl_tax)']").check();
    cy.get('[data-role="opc-continue"]').click();
    cy.url().should("contain","https://magento.softwaretestingboard.com/checkout/#payment");
    cy.get('[title="Place Order"]').click();
    cy.url().should("contain","https://magento.softwaretestingboard.com/checkout/onepage/success/");
    cy.get('[data-ui-id="page-title-wrapper"]').should("be.visible").and ("contains.texte","Thank you for your purchase!");
    
  });


});