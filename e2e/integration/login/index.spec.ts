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
    cy.submitForm();

    cy.formHasErrors(2);
  });

  it("displays an error if the form is submitted with invalid fields", () => {
    cy.findByTestId("email").eq(1).type("staffmember@example.com");

    cy.findByTestId("password").eq(1).type("passw");

    cy.submitForm();

    cy.alertExistsWith(
      "There was a problem with your login credentials. Please make sure your username and password are correct."
    );
  });

  it("rejects suspended users", () => {
    cy.findByTestId("email").eq(1).type("suspended.employee@example.com");

    cy.findByTestId("password").eq(1).type("password");

    cy.submitForm();

    cy.alertExistsWith(
      "Access to your account was revoked. The account you're trying to log into has been permanently suspended."
    );
  });

  it("logs the user in and redirects them to the dashboard", () => {
    cy.findByTestId("email").eq(1).type("staffmember@example.com");

    cy.findByTestId("password").eq(1).type("password");

    cy.submitForm();

    cy.url().should("contain", "/employee/dashboard");
  });
});
