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
    cy.findByTestId("login-form").should("have.length", 1);
  });

  it("displays required fields if the form is submitted with empty fields", () => {
    cy.findByTestId("submit-button").click();

    cy.findByTestId("errors").should("have.length", 2);
  });

  it("displays an error if the form is submitted with invalid fields", () => {
    cy.findByTestId("email").eq(1).type("staffmember@example.com");

    cy.findByTestId("password").eq(1).type("passw");

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .and(
        "have.text",
        "There was a problem with your login credentials. Please make sure your username and password are correct."
      );

    cy.findByTestId("alert-message").click();
  });

  it("rejects suspended users", () => {
    cy.findByTestId("email").eq(1).type("suspended.employee@example.com");

    cy.findByTestId("password").eq(1).type("password");

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .and(
        "have.text",
        "Access to your account was revoked. The account you're trying to log into has been permanently suspended."
      );

    cy.findByTestId("alert-message").click();
  });

  it("logs the user in and redirects them to the dashboard", () => {
    cy.findByTestId("email").eq(1).type("staffmember@example.com");

    cy.findByTestId("password").eq(1).type("password");

    cy.findByTestId("submit-button").click();

    cy.url().should("contain", "/employee/dashboard");
  });
});
