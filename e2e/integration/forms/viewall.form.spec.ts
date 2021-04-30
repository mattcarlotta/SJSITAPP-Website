context("Staff View Forms Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.reload();
    cy.visit("/employee/forms/viewall?page=1");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the View Forms page and table", () => {
    cy.findByTestId("view-forms-page").should("exist");
    cy.findByTestId("data-table").should("exist");
  });

  it("filters the events table", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByDataField("_id").should("have.length", 11);

    cy.findByTestId("filter-button").click();

    cy.findByTestId("Season Id-filter").click();

    cy.findByTestId("seasonId").type("20002001");

    cy.findByTestId("modal-submit").click();

    cy.findByDataField("_id").should("have.length", 2);
  });

  it("navigates to the Create Form page", () => {
    cy.findByTestId("view-forms-page")
      .should("exist")
      .find("[data-testid='create-form-link']")
      .click();

    cy.url().should("contain", "/employee/forms/create");

    cy.findByTestId("create-form-page").should("exist");
  });

  it("navigates to a view A/P Form responses page", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").first().should("exist").click();

    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/forms/view");

    cy.findByTestId("ap-form-responses").should("exist");
  });

  it("navigates to an edit Form page", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").first().should("exist").click();

    cy.findByTestId("edit-record").click();

    cy.url().should("contain", "/employee/forms/edit");

    cy.findByTestId("edit-apform-page").should("exist");
  });

  it("resends Form email notifications", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByDataField("sentEmails")
      .eq(4)
      .find("[data-testid='sent']")
      .should("exist");

    cy.findByTestId("table-actions").eq(3).should("exist").click();

    cy.findByTestId("resend-record").click();

    cy.alertExistsWith(
      "Email notifications for that form will be resent shortly."
    );

    cy.findByDataField("sentEmails")
      .eq(4)
      .find("[data-testid='unsent']")
      .should("exist");
  });

  it("deletes an event", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").eq(7).should("exist").click();

    cy.findByTestId("delete-record").click();

    cy.alertExistsWith("Successfully deleted the form.");
  });

  it("deletes multiple forms", () => {
    cy.findByTestId("data-table").should("exist");

    cy.get("input[type=checkbox]").then(e => {
      const elements = e.map((_, el) => Cypress.$(el));

      cy.wrap(elements[9]).click();
      cy.wrap(elements[10]).click();
    });

    cy.findByTestId("table-actions").first().click();

    cy.findByTestId("delete-many-records").click();

    cy.alertExistsWith("Successfully deleted the forms.");
  });
});
