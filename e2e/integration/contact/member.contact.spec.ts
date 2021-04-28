context("Member Contact Us Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.request("POST", "http://localhost:5000/api/signin", {
      email: "scheduledmember@test.com",
      password: "password"
    });
    cy.reload();
    cy.visit("/employee/contact-us");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the contact-us page", () => {
    cy.get("[data-testid='contact-us-page']")
      .find("[data-testid='card-head-title']")
      .contains("Contact Us");
  });

  it("displays form errors if fields are empty", () => {
    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='errors']").should("have.length", 3);
  });

  it("sends an email", () => {
    cy.get("[data-testid='sendTo']")
      .find("[data-testid='select-text']")
      .first()
      .click();

    cy.get("[data-testid='Staff']").first().click();

    cy.get("input[name='subject']").type("Test Email");

    cy.get("textarea[name='message']").type("Hi. :)");

    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='alert-message']")
      .should("have.length", 1)
      .and(
        "have.text",
        "Thank you for contacting us. The staff has received your message. Expect a response within 24 hours."
      );

    cy.get("[data-testid='alert-message']").click();
  });
});
