context("Staff Send Mail Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.reload();
    cy.visit("/employee/mail/create");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the Compose Mail Form page", () => {
    cy.findByTestId("compose-mail-page").should("exist");
    cy.findByTestId("compose-mail-form").should("exist");
  });

  it("displays errors if empty fields are submitted", () => {
    cy.findByTestId("compose-mail-form").should("exist");

    cy.submitForm();

    cy.formHasErrors(3);
  });

  it("preview and submits sends an email", () => {
    cy.findByTestId("compose-mail-form").should("exist");

    cy.findByTestId("Scheduled Member <scheduledmember@test.com>")
      .first()
      .click();

    cy.findByTestId("move-items-down").click();

    cy.findByTestId("subject").type("Hello");

    cy.findByTestId("message").type("Test email.");

    cy.findByTestId("preview-email-button").click();

    cy.findByTestId("email-subject").should("have.text", "Hello");

    cy.findByTestId("send-to-address").contains("Scheduled Member");

    cy.findByTestId("email-message").should("have.text", "Test email.");

    cy.findByTestId("close-modal").click();

    cy.submitForm();

    cy.alertExistsWith("An email has been created and will be sent shortly!");

    cy.url().should("contain", "/employee/mail/viewall?page=1");
  });
});
