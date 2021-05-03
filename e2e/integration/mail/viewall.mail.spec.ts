context("Staff View Mail Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/mail/viewall?page=1");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the View Mail page and table", () => {
    cy.findByTestId("view-mail-page").should("exist");
    cy.findByTestId("data-table").should("exist");
  });

  it("filters the mail table", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByDataField("status").should("have.length", 7);

    cy.findByTestId("filter-button").click();

    cy.findByTestId("Email Status-filter").click();

    cy.findByTestId("status-selected-value").click();

    cy.findByTestId("sent").click();

    cy.findByTestId("modal-submit").click();

    cy.findByDataField("status").should("have.length", 4);
  });

  it("navigates to the Compose Mail page", () => {
    cy.findByTestId("view-mail-page")
      .should("exist")
      .find("[data-testid='create-mail-link']")
      .click();

    cy.url().should("contain", "/employee/mail/create");

    cy.findByTestId("compose-mail-page").should("exist");
  });

  it("navigates to a View Email page", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").first().should("exist").click();

    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/mail/view");

    cy.findByTestId("view-email-page").should("exist");
  });

  it("resends email", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").eq(4).should("exist").click();

    cy.findByTestId("resend-record").click();

    cy.alertExistsWith("That email will be resent shortly.");
  });

  it("deletes a mail", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").should("exist").last().click();

    cy.findByTestId("delete-record").click();

    cy.alertExistsWith("Successfully deleted the email.");
  });

  it("deletes multiple emails", () => {
    cy.findByTestId("data-table").should("exist");

    cy.get("input[type=checkbox]").then(e => {
      const elements = e.map((_, el) => Cypress.$(el));

      cy.wrap(elements[2]).click();
      cy.wrap(elements[3]).click();
    });

    cy.findByTestId("table-actions").first().click();

    cy.findByTestId("delete-many-records").click();

    cy.alertExistsWith("Successfully deleted the mail.");
  });
});
