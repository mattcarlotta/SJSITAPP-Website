const fields = [
  "0123456789",
  "static@member.com",
  "Static",
  "Member",
  "password"
];

const badFields = [
  "0123456789",
  "notavalidemail@member.com",
  "Static",
  "Member",
  "password"
];

context("Signup Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.visit("/employee/signup");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays a reset password screen", () => {
    cy.get("[data-testid='signup-form']").should("have.length", 1);
  });

  it("displays required fields if the form is submitted with empty fields", () => {
    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='errors']").should("have.length", 5);
  });

  it("fills out all of the signup fields", () => {
    fields.forEach((value, index) => {
      cy.get("[data-testid='signup-form']")
        .find("input")
        .eq(index)
        .type(value)
        .should("have.value", value);
    });
  });

  it("displays an error message if the form is submitted with an invalid authorized email", () => {
    badFields.forEach((value, index) => {
      cy.get("[data-testid='signup-form']")
        .find("input")
        .eq(index)
        .type(value)
        .should("have.value", value);
    });

    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='alert-message']")
      .should("have.length", 1)
      .and(
        "have.text",
        "There was a problem authenticating your request. The authorized key that was supplied does not match the staff approved email."
      );

    cy.get("[data-testid='alert-message']").click();
  });

  it("displays a success message if the form is submitted with valid fields and allows the member to sign in", () => {
    fields.forEach((value, index) => {
      cy.get("[data-testid='signup-form']")
        .find("input")
        .eq(index)
        .type(value)
        .should("have.value", value);
    });

    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='alert-message']")
      .should("have.length", 1)
      .and(
        "have.text",
        "Thank you for registering, Static Member. Your account is ready to go! Feel free to sign in with your email and password in the login form below."
      );

    cy.get("[data-testid='alert-message']").click();

    cy.url().should("contain", "/employee/login");

    cy.get("[data-testid='login-form']").should("have.length", 1);

    cy.get("[name='email']").type(fields[1]);

    cy.get("[name='password']").type(fields[4]);

    cy.get("[data-testid='submit-button']").click();

    cy.url().should("contain", "/employee/dashboard");
  });
});
