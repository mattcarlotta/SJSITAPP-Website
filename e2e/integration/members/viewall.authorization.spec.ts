context("Staff View Authorizations Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/members/authorizations/viewall?page=1");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the authorizations page and authorizations table", () => {
    cy.findByTestId("view-authorizations-page").should("exist");
    cy.findByTestId("data-table").should("exist");
  });

  it("filters the authorizations table", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByDataField("email").should("have.length", 11);

    cy.findByTestId("filter-button").click();

    cy.findByTestId("Email-filter").click();

    cy.findByTestId("authorizedEmail").type("member@example.com");

    cy.findByTestId("modal-submit").click();

    cy.findByDataField("email").should("have.length", 2);
  });

  it("navigates to the Create Member page", () => {
    cy.findByTestId("view-authorizations-page")
      .should("exist")
      .find("[data-testid='add-member-link']")
      .click();

    cy.url().should("contain", "/employee/members/create");

    cy.findByTestId("create-member-page").should("exist");
  });

  it("rejects to resend authorization emails that have already been used", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").eq(1).should("exist").click();

    cy.findByTestId("resend-record").click();

    cy.alertExistsWith(
      "Unable to update this authorization token. The key has already been used and is associated with an active account."
    );
  });

  it("resends authorization emails", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").eq(2).should("exist").click();

    cy.findByTestId("resend-record").click();

    cy.alertExistsWith(
      "An authorization token will be resent to member55@example.com shortly."
    );
  });

  it("deletes an authorization", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").eq(3).should("exist").click();

    cy.findByTestId("delete-record").click();

    cy.alertExistsWith("Successfully deleted the authorization token.");
  });

  it("deletes multiple authorizations", () => {
    cy.findByTestId("data-table").should("exist");

    cy.get("input[type=checkbox]").then(e => {
      const elements = e.map((_, el) => Cypress.$(el));

      cy.wrap(elements[9]).click();
      cy.wrap(elements[10]).click();
    });

    cy.findByTestId("table-actions").first().click();

    cy.findByTestId("delete-many-records").click();

    cy.alertExistsWith("Successfully deleted the authorization tokens.");
  });
});
