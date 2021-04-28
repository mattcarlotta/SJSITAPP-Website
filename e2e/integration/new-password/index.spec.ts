context("New Password Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.visit("/employee/new-password?token=1234567890");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays a new password form page", () => {
    cy.findByTestId("new-password-form").should("exist");
  });

  it("displays required fields if the form is submitted with empty fields", () => {
    cy.findByTestId("submit-button").click();

    cy.findByTestId("errors").should("have.length", 1);
  });

  it("displays an error if the form is submitted with the same password", () => {
    cy.findByTestId("password")
      .eq(1)
      .type("password")
      .should("have.value", "password");

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("have.length", 1)
      .and(
        "have.text",
        "Your new password must not match your current password. Please try again."
      );

    cy.findByTestId("alert-message").click();
  });

  it("displays a success message if the form is submitted with an valid password and redirects the user back to the login page", () => {
    cy.findByTestId("password")
      .eq(1)
      .type("password2")
      .should("have.value", "password2");

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("have.length", 1)
      .and(
        "have.text",
        "The password has been reset for reset.password@example.com. Please sign into your account with your new password."
      );

    cy.findByTestId("alert-message").click();

    cy.url().should("contain", "/employee/login");

    cy.findByTestId("login-form").should("exist");

    cy.findByTestId("email").eq(1).type("reset.password@example.com");

    cy.findByTestId("password").eq(1).type("password2");

    cy.findByTestId("submit-button").click();

    cy.url().should("contain", "/employee/dashboard");
  });
});
