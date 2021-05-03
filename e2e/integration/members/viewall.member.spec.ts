context("Staff View Members Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/members/viewall?page=1");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the members page and members table", () => {
    cy.findByTestId("view-members-page").should("exist");
    cy.findByTestId("data-table").should("exist");
  });

  it("filters the members table", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByDataField("email").should("have.length", 11);

    cy.findByTestId("filter-button").click();

    cy.findByTestId("Email-filter").click();

    cy.findByTestId("email").type("staffmember@example.com");

    cy.findByTestId("modal-submit").click();

    cy.findByDataField("email").should("have.length", 2);
  });

  it("navigates to the Create Member page", () => {
    cy.findByTestId("view-members-page")
      .should("exist")
      .find("[data-testid='add-member-link']")
      .click();

    cy.url().should("contain", "/employee/members/create");

    cy.findByTestId("create-member-page").should("exist");
  });

  it("navigates to a View Member page", () => {
    cy.findByTestId("data-table").should("exist");
    cy.findByTestId("table-actions").eq(6).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

    cy.findByTestId("member-profile").should("exist");
  });

  it("deletes a member", () => {
    cy.findByTestId("data-table").should("exist");
    cy.findByTestId("table-actions").eq(6).click();
    cy.findByTestId("delete-record").click();

    cy.alertExistsWith("Successfully deleted the member.");
  });
});
