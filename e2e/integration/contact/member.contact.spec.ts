context("Member Contact Us Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.memberLogin();
    cy.reload();
    cy.visit("/employee/contact-us");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the contact-us page", () => {
    cy.findByTestId("card-head-title").contains("Contact Us");
  });

  it("displays form errors if fields are empty", () => {
    cy.findByTestId("submit-button").click();

    cy.findByTestId("errors").should("have.length", 3);
  });

  it("sends an email", () => {
    cy.findByTestId("sendTo")
      .find("[data-testid='select-text']")
      .first()
      .click();

    cy.findByTestId("Staff").first().click();

    cy.get("input[name='subject']").type("Test Email");

    cy.get("textarea[name='message']").type("Hi. :)");

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .and(
        "have.text",
        "Thank you for contacting us. The staff has received your message. Expect a response within 24 hours."
      );

    cy.findByTestId("alert-message").click();
  });
});
