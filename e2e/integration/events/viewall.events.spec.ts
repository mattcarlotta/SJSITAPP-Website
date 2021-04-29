context("Staff View Events Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.reload();
    cy.visit("/employee/events/viewall?page=1");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the events page and events table", () => {
    cy.findByTestId("view-events-page").should("exist");
    cy.findByTestId("data-table").should("exist");
  });

  it("navigates to the Add Event page", () => {
    cy.findByTestId("view-events-page")
      .should("exist")
      .find("[data-testid='create-event-link']")
      .click();

    cy.url().should("contain", "/employee/events/create");

    cy.findByTestId("create-event-page").should("exist");
  });

  it("navigates to a scheduling event page", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").first().should("exist").click();

    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/events/scheduling");

    cy.findByTestId("schedule-event-page").should("exist");
  });

  it("navigates to an edit event page", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").first().should("exist").click();

    cy.findByTestId("edit-record").click();

    cy.url().should("contain", "/employee/events/edit");

    cy.findByTestId("edit-event-page").should("exist");
  });

  it("filters the events table", () => {
    cy.findByTestId("data-table").should("exist");

    cy.get("[data-field='_id']").should("have.length", 11);

    cy.findByTestId("filter-button").click();

    cy.findByTestId("Opponent-filter").click();

    cy.findByTestId("opponent").type("Red Wings");

    cy.findByTestId("modal-submit").click();

    cy.get("[data-field='_id']").should("have.length", 2);
  });

  it("resends event notifications", () => {
    cy.findByTestId("data-table").should("exist");
    cy.get("[data-field='sentEmailReminders']")
      .eq(7)
      .find("[data-testid='true']")
      .should("exist");

    cy.findByTestId("table-actions").eq(6).should("exist").click();

    cy.findByTestId("resend-record").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .and(
        "have.text",
        "Email notifications for that event will be resent within 24 hours of the event date."
      );

    cy.findByTestId("alert-message").click();
  });

  it("deletes an event", () => {
    cy.findByTestId("table-actions").eq(7).should("exist").click();

    cy.findByTestId("delete-record").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .and("have.text", "Successfully deleted the event.");

    cy.findByTestId("alert-message").click();
  });

  it("deletes multiple events", () => {
    cy.findByTestId("data-table").should("exist");

    cy.get("input[type=checkbox]").then(e => {
      const elements = e.map((_, el) => Cypress.$(el));

      cy.wrap(elements[9]).click();
      cy.wrap(elements[10]).click();
    });

    cy.findByTestId("table-actions").first().click();

    cy.findByTestId("delete-many-records").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .and("have.text", "Successfully deleted the events.");

    cy.findByTestId("alert-message").click();
  });
});
