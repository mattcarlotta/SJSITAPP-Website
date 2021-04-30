context("Staff Schedule Event Page", () => {
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

  it("displays the schedule event page and form", () => {
    cy.findByTestId("table-actions").eq(5).should("exist").click();

    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/events/scheduling");

    cy.findByTestId("schedule-event-page").should("have.exist");

    cy.findByTestId("schedule-event-form").should("have.exist");
  });

  it("schedules an event", () => {
    cy.findByDataField("scheduledIds").eq(6).should("have.text", "0");

    cy.findByTestId("table-actions").eq(5).should("exist").click();

    cy.findByTestId("view-record").click();

    cy.findByTestId("schedule-event-form").should("have.exist");

    cy.findByTestId("Member Member")
      .trigger("keydown", { keyCode: 32 })
      .trigger("keydown", { keyCode: 39, force: true })
      .wait(300)
      .trigger("keydown", { keyCode: 32, force: true });

    cy.findByTestId("Member2 Member2")
      .trigger("keydown", { keyCode: 32 })
      .trigger("keydown", { keyCode: 39, force: true })
      .wait(300)
      .trigger("keydown", { keyCode: 32, force: true })
      .wait(750);

    cy.submitForm();

    cy.alertExistsWith("Successfully updated the event's schedule.");

    cy.url().should("contain", "/employee/events/viewall?page=1");

    cy.findByDataField("scheduledIds").eq(6).should("have.text", "2");
  });
});
