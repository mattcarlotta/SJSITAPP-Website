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
    cy.get("[data-testid='new-password-form']").should("have.length", 1);
  });

  it("fills out the 'Password' input", () => {
    cy.get("form")
      .find("input")
      .first()
      .type("password")
      .should("have.value", "password");
  });

  it("displays required fields if the form is submitted with empty fields", () => {
    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='errors']").should("have.length", 1);
  });

  it("displays an error if the form is submitted with the same password", () => {
    cy.get("form")
      .find("input")
      .first()
      .type("password")
      .should("have.value", "password");

    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='alert-message']")
      .should("have.length", 1)
      .and(
        "have.text",
        "Your new password must not match your current password. Please try again."
      );

    cy.get("[data-testid='alert-message']").click();
  });

  it("displays a success message if the form is submitted with an valid password and redirects the user back to the login page", () => {
    cy.get("form")
      .find("input")
      .first()
      .type("password2")
      .should("have.value", "password2");

    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='alert-message']")
      .should("have.length", 1)
      .and(
        "have.text",
        "The password has been reset for reset.password@example.com. Please sign into your account with your new password."
      );

    cy.get("[data-testid='alert-message']").click();

    cy.url().should("contain", "/employee/login");

    cy.get("[data-testid='login-form']").should("have.length", 1);

    cy.get("[name='email']").type("reset.password@example.com");

    cy.get("[name='password']").type("password2");

    cy.get("[data-testid='submit-button']").click();

    cy.url().should("contain", "/employee/dashboard");
  });
});
