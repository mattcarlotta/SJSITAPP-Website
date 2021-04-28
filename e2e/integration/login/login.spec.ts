context("Login Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.visit("/employee/login");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays a login screen", () => {
    cy.get("[data-testid='login-form']").should("have.length", 1);
  });

  it("fills out the 'Email' input", () => {
    cy.get("[data-testid='login-form']")
      .find("input")
      .first()
      .type("staffmember@example.com")
      .should("have.value", "staffmember@example.com");
  });

  it("fills out the 'Passowrd' input", () => {
    cy.get("[data-testid='login-form']")
      .find("input")
      .eq(1)
      .type("password")
      .should("have.value", "password");
  });

  it("displays required fields if the form is submitted with empty fields", () => {
    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='errors']").should("have.length", 2);
  });

  it("displays an error if the form is submitted with invalid fields", () => {
    cy.get("[name='email']").type("staffmember@example.com");

    cy.get("[name='password']").type("passw");

    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='alert-message']")
      .should("have.length", 1)
      .and(
        "have.text",
        "There was a problem with your login credentials. Please make sure your username and password are correct."
      );

    cy.get("[data-testid='alert-message']").click();
  });

  it("logs the user in and redirects them to the dashboard", () => {
    cy.get("[name='email']").type("staffmember@example.com");

    cy.get("[name='password']").type("password");

    cy.get("[data-testid='submit-button']").click();

    cy.url().should("contain", "/employee/dashboard");
  });

  it("rejects suspended users", () => {
    cy.get("[name='email']").type("suspended.employee@example.com");

    cy.get("[name='password']").type("password");

    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='alert-message']")
      .should("have.length", 1)
      .and(
        "have.text",
        "Access to your account was revoked. The account you're trying to log into has been permanently suspended."
      );

    cy.get("[data-testid='alert-message']").click();
  });
});
