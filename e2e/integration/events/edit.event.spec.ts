import moment from "../../../src/utils/momentWithTimezone";
import { fullyearFormat } from "../../../src/utils/dateFormats";

const currentYearDate = moment().format(fullyearFormat);
const nextYearDate = moment().add(1, "year").format(fullyearFormat);

const currentSeason = `${currentYearDate}${nextYearDate}`;

context("Staff Edit Event Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
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

    cy.findElementByNameAttribute("input", "callTime").first().click();

    cy.get(".MuiPickersToolbarButton-toolbarBtn")
      .first()
      .should("exist")
      .click();

    cy.get(".MuiPickersClock-squareMask").click(250, 120); // set to 3 hours
    cy.get(".MuiPickersClock-squareMask").click(250, 125); // set to 15 minutes

    cy.clickOK();

    cy.findByTestId("add-calltime-field").click();

    cy.get(`input[name^='callTime-']`).first().click();

    cy.get(".MuiPickersToolbarButton-toolbarBtn")
      .first()
      .should("exist")
      .click();

    cy.get(".MuiPickersClock-squareMask").click(250, 120); // set to 3 hours
    cy.get(".MuiPickersClock-squareMask").click(250, 125); // set to 15 minutes

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith(
      "One or more of the 'Scheduling Call Times' is a duplicate. Please remove the duplicate(s) before submitting the form again."
    );
  });

  it("displays an API call event error when event falls outside of season", () => {
    cy.findByTestId("table-actions").eq(2).should("exist").click();
    cy.findByTestId("edit-record").first().should("exist").click();

    cy.findByTestId("edit-event-page").should("exist");

    cy.findElementByNameAttribute("input", "eventDate").first().click();

    cy.clickYear();

    cy.selectYear("1899");

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith(
      `The event date selected below falls outside of the ${currentSeason} season.`
    );
  });

  it("updates an event call times which resets scheduled members", () => {
    cy.findByDataField("scheduledIds").eq(1).should("have.text", "1");

    cy.findByTestId("table-actions").first().should("exist").click();
    cy.findByTestId("edit-record").first().should("exist").click();

    cy.findElementByNameAttribute("input", "callTime").first().click();

    cy.get(".MuiPickersToolbarButton-toolbarBtn")
      .first()
      .should("exist")
      .click();

    cy.get(".MuiPickersClock-squareMask").click(250, 120); // set to 3 hours
    cy.get(".MuiPickersClock-squareMask").click(250, 125); // set to 15 minutes

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith(
      "Successfully updated the event. Please note that the call times were changed; therefore, any previous scheduling for the event has been removed and will need to be rescheduled."
    );

    cy.url().should("contain", "/employee/events/viewall?page=1");

    cy.findByDataField("scheduledIds").eq(1).should("have.text", "0");
  });

  it("updates event location which doesn't change scheduled members", () => {
    cy.findByDataField("scheduledIds").eq(2).should("have.text", "1");
    cy.findByDataField("location")
      .eq(2)
      .should("have.text", "SAP Center at San Jose");

    cy.findByTestId("table-actions").eq(1).should("exist").click();
    cy.findByTestId("edit-record").first().should("exist").click();

    cy.findByTestId("location").should("exist").clear().type("N/A");

    cy.submitForm();

    cy.alertExistsWith("Successfully updated the event.");

    cy.url().should("contain", "/employee/events/viewall?page=1");

    cy.findByDataField("scheduledIds").eq(2).should("have.text", "1");
    cy.findByDataField("location").eq(2).should("have.text", "N/A");
  });
});
