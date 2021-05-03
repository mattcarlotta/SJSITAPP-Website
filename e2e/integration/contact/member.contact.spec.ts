context("Member Contact Us Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.memberLogin();
    cy.visit("/employee/contact-us");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the contact-us page", () => {
    cy.findByTestId("card-head-title").contains("Contact Us");
  });

  it("displays form errors if fields are empty", () => {
    cy.submitForm();

    cy.formHasErrors(3);
  });

  it("sends an email", () => {
    cy.findByTestId("sendTo")
      .find("[data-testid='select-text']")
      .first()
      .click();

    cy.findByTestId("Staff").first().click();

    cy.findElementByNameAttribute("input", "subject").type("Test Email");

    cy.findElementByNameAttribute("textarea", "message").type("Hi. :)");

    cy.submitForm();

    cy.alertExistsWith(
      "Thank you for contacting us. The staff has received your message. Expect a response within 24 hours."
    );
  });
});
