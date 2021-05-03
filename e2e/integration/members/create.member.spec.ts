context("Staff Create Member Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/members/create");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the Create Member form", () => {
    cy.findByTestId("create-member-page").should("exist");
    cy.findByTestId("create-member-form").should("exist");
  });

  it("displays errors if empty fields are submitted", () => {
    cy.submitForm();

    cy.formHasErrors(1);
  });

  it("prevents duplicate authorized emails", () => {
    cy.findByTestId("authorizedEmail")
      .should("exist")
      .type("member@example.com");

    cy.submitForm();

    cy.alertExistsWith(
      "That email is already associated with another authorization token. Please delete the old authorization token or use a different email."
    );
  });

  it("creates an authorized email", () => {
    cy.findByTestId("authorizedEmail")
      .should("exist")
      .type("newmembersignup@example.com");

    cy.submitForm();

    cy.alertExistsWith(
      "Successfully created and sent an authorization token to newmembersignup@example.com."
    );

    cy.url().should(
      "contain",
      "/employee/members/authorizations/viewall?page=1"
    );
  });
});
