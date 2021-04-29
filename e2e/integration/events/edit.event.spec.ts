import moment from "../../../src/utils/momentWithTimezone";

const currentYearDate = moment().format("YYYY");
const nextYearDate = moment().add(1, "year").format("YYYY");

const currentSeason = `${currentYearDate}${nextYearDate}`;

context("Staff Edit Event Page", () => {
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

  it("displays the Edit Event form", () => {
    cy.findByTestId("table-actions").first().should("exist").click();
    cy.findByTestId("edit-record").first().should("exist").click();
    cy.findByTestId("edit-event-page").should("exist");
  });

  it("displays an API call time error when call times aren't unique", () => {
    cy.findByTestId("table-actions").eq(2).should("exist").click();
    cy.findByTestId("edit-record").first().should("exist").click();

    cy.findByTestId("edit-event-page").should("exist");

    cy.get(`input[name='callTime']`).first().click();

    cy.get(".MuiPickersToolbarButton-toolbarBtn")
      .first()
      .should("exist")
      .click();

    cy.get(".MuiPickersClock-squareMask").click(250, 120); // set to 3 hours
    cy.get(".MuiPickersClock-squareMask").click(250, 125); // set to 15 minutes

    cy.get(".MuiDialogActions-spacing")
      .find("button")
      .eq(1)
      .should("exist")
      .click();

    cy.findByTestId("add-calltime-field").click();

    cy.get(`input[name^='callTime-']`).first().click();

    cy.get(".MuiPickersToolbarButton-toolbarBtn")
      .first()
      .should("exist")
      .click();

    cy.get(".MuiPickersClock-squareMask").click(250, 120); // set to 3 hours
    cy.get(".MuiPickersClock-squareMask").click(250, 125); // set to 15 minutes

    cy.get(".MuiDialogActions-spacing")
      .find("button")
      .eq(1)
      .should("exist")
      .click();

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .and(
        "have.text",
        "One or more of the 'Scheduling Call Times' is a duplicate. Please remove the duplicate(s) before submitting the form again."
      );

    cy.findByTestId("alert-message").click();
  });

  it("displays an API call event error when event falls outside of season", () => {
    cy.findByTestId("table-actions").eq(2).should("exist").click();
    cy.findByTestId("edit-record").first().should("exist").click();

    cy.findByTestId("edit-event-page").should("exist");

    cy.get(`input[name='eventDate']`).click();

    cy.get(".MuiPickersToolbarButton-toolbarBtn")
      .first()
      .should("exist")
      .click();

    cy.get(".MuiPickersYearSelection-container")
      .find("div[role='button']")
      .first()
      .should("exist")
      .click();

    cy.get(".MuiDialogActions-spacing")
      .find("button")
      .eq(1)
      .should("exist")
      .click();

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .contains(
        `The event date selected below falls outside of the ${currentSeason} season.`
      );

    cy.findByTestId("alert-message").click();
  });

  it("updates an event call times which resets scheduled members", () => {
    cy.get("[data-field='scheduledIds']").eq(1).should("have.text", "1");

    cy.findByTestId("table-actions").first().should("exist").click();
    cy.findByTestId("edit-record").first().should("exist").click();

    cy.get(`input[name='callTime']`).first().click();

    cy.get(".MuiPickersToolbarButton-toolbarBtn")
      .first()
      .should("exist")
      .click();

    cy.get(".MuiPickersClock-squareMask").click(250, 120); // set to 3 hours
    cy.get(".MuiPickersClock-squareMask").click(250, 125); // set to 15 minutes

    cy.get(".MuiDialogActions-spacing")
      .find("button")
      .eq(1)
      .should("exist")
      .click();

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .and(
        "have.text",
        "Successfully updated the event. Please note that the call times were changed; therefore, any previous scheduling for the event has been removed and will need to be rescheduled."
      );

    cy.findByTestId("alert-message").click();

    cy.url().should("contain", "/employee/events/viewall?page=1");

    cy.get("[data-field='scheduledIds']").eq(1).should("have.text", "0");
  });

  it("updates event location which doesn't change scheduled members", () => {
    cy.get("[data-field='scheduledIds']").eq(2).should("have.text", "1");
    cy.get("[data-field='location']")
      .eq(2)
      .should("have.text", "SAP Center at San Jose");

    cy.findByTestId("table-actions").eq(1).should("exist").click();
    cy.findByTestId("edit-record").first().should("exist").click();

    cy.findByTestId("location").should("exist").clear().type("N/A");

    cy.findByTestId("submit-button").click();

    cy.findByTestId("alert-message")
      .should("exist")
      .and("have.text", "Successfully updated the event.");

    cy.findByTestId("alert-message").click();

    cy.url().should("contain", "/employee/events/viewall?page=1");

    cy.get("[data-field='scheduledIds']").eq(2).should("have.text", "1");
    cy.get("[data-field='location']").eq(2).should("have.text", "N/A");
  });
});
