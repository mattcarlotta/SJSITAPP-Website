import moment from "../../../src/utils/momentWithTimezone";
import { fullyearFormat } from "../../../src/utils/dateFormats";

const currentYearDate = moment().format(fullyearFormat);
const nextYearDate = moment().add(1, "year").format(fullyearFormat);

const currentSeason = `${currentYearDate}${nextYearDate}`;

context("Staff Create Event Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/events/create");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the create event form", () => {
    cy.findByTestId("create-event-page").should("exist");
    cy.findByTestId("event-form").should("exist");
  });

  it("displays errors when form is submitted with empty fields", () => {
    cy.findByTestId("event-form").should("exist");

    cy.submitForm();

    cy.formHasErrors(4);
  });

  it("displays an API call time error when call times aren't unique", () => {
    cy.findByTestId("event-form").should("exist");

    cy.findByTestId("seasonId-selected-value").click();

    cy.findByTestId(currentSeason).first().click();

    cy.setMUIField("eventDate");

    cy.findByTestId("uniform-selected-value").click();

    cy.findByTestId("Sharks Teal Jersey").first().click();

    cy.findByTestId("add-calltime-field").click();

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
    cy.findByTestId("event-form").should("exist");

    cy.findByTestId("seasonId-selected-value").click();

    cy.findByTestId(currentSeason).first().click();

    cy.findElementByNameAttribute("input", "eventDate").click();

    cy.clickYear();

    cy.selectYear("1899");

    cy.clickOK();

    cy.findByTestId("uniform-selected-value").click();

    cy.findByTestId("Sharks Teal Jersey").first().click();

    cy.setMUIField("callTime");

    cy.submitForm();

    cy.alertExistsWith(
      `The event date selected below falls outside of the ${currentSeason} season.`
    );
  });

  it("creates an an event and redirects to viewall events page", () => {
    cy.findByTestId("event-form").should("exist");

    cy.findByTestId("seasonId-selected-value").click();

    cy.findByTestId(currentSeason).first().click();

    cy.setMUIField("eventDate");

    cy.findByTestId("uniform-selected-value").click();

    cy.findByTestId("Sharks Teal Jersey").first().click();

    cy.setMUIField("callTime");

    cy.submitForm();

    cy.alertExistsWith(
      `Successfully added a new event to the ${currentSeason} season.`
    );

    cy.url().should("contain", "/employee/events/viewall?page=1");
  });
});
