context("Reset Password Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.visit("/employee/reset-password");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays a reset password form page", () => {
    cy.findByTestId("reset-password-form").should("exist");
  });

  it("displays required fields if the form is submitted with empty fields", () => {
    cy.findByTestId("submit-button").click();

    cy.findByTestId("errors").should("have.length", 1);
  });

  it("displays an error if the form is submitted with an invalid email", () => {
    cy.findByTestId("email")
      .eq(1)
      .type("emaildoesnotexist@example.com")
      .should("have.value", "emaildoesnotexist@example.com");

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("have.length", 1)
      .and(
        "have.text",
        "That email is not associated with an active account. Please make sure the email address is spelled correctly."
      );

    cy.findByTestId("alert-message").click();
  });

  it("displays a success message if the form is submitted with an valid email and redirects the member back to the login page", () => {
    cy.findByTestId("email")
      .eq(1)
      .type("staffmember@example.com")
      .should("have.value", "staffmember@example.com");

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("have.length", 1)
      .and(
        "have.text",
        "The password reset request has been accepted. Your request is being processed. Please check staffmember@example.com for a confirmation link to set up a new password."
      );

    cy.findByTestId("alert-message").click();

    cy.url().should("contain", "/employee/login");
  });
});