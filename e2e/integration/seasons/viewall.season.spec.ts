context("Staff View Seasons Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/seasons/viewall?page=1");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the seasons page and seasons table", () => {
    cy.findByTestId("view-seasons-page").should("exist");
    cy.findByTestId("data-table").should("exist");
  });

  it("filters the seasons table", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByDataField("seasonId").should("have.length", 6);

    cy.findByTestId("filter-button").click();

    cy.findByTestId("Season Id-filter").click();

    cy.findByTestId("seasonId").type("20052006");

    cy.findByTestId("modal-submit").click();

    cy.findByDataField("seasonId").should("have.length", 2);
  });

  it("navigates to the Create Season page", () => {
    cy.findByTestId("view-seasons-page")
      .should("exist")
      .find("[data-testid='create-season-link']")
      .click();

    cy.url().should("contain", "/employee/seasons/create");

    cy.findByTestId("create-season-page").should("exist");
  });

  it("navigates to an Edit Season page", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").eq(3).should("exist").click();

    cy.findByTestId("edit-record").click();

    cy.url().should("contain", "/employee/seasons/edit");

    cy.findByTestId("edit-season-page").should("exist");
  });

  it("deletes a season", () => {
    cy.findByTestId("data-table").should("exist");
    cy.findByTestId("table-actions").eq(4).click();
    cy.findByTestId("delete-record").click();

    cy.alertExistsWith("Successfully deleted the season.");
  });
});
