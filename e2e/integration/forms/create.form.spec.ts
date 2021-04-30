import moment from "../../../src/utils/momentWithTimezone";
import { fullyearFormat } from "../../../src/utils/dateFormats";

const currentYearDate = moment().format(fullyearFormat);
const nextYearDate = moment().add(1, "year").format(fullyearFormat);

const currentSeason = `${currentYearDate}${nextYearDate}`;

context("Staff Create Form Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.reload();
    cy.visit("/employee/forms/create");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the Create AP Form page and New AP Form form", () => {
    cy.findByTestId("create-form-page").should("exist");
    cy.findByTestId("ap-form").should("exist");
  });

  it("displays errors if empty fields are submitted", () => {
    cy.findByTestId("ap-form").should("exist");

    cy.submitForm();

    cy.formHasErrors(4);
  });

  it("rejects creating an A/P form that already exists", () => {
    cy.findByTestId("ap-form").should("exist");

    cy.findByTestId("seasonId-selected-value").click();

    cy.findByTestId(currentSeason).first().click();

    cy.findElementByNameAttribute("input", "startMonth").click();

    cy.selectDate(1);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "endMonth").click();

    cy.selectLastDate();

    cy.clickOK();

    cy.findElementByNameAttribute("input", "expirationDate").click();

    cy.selectDate(7);

    cy.clickOK();

    cy.findByTestId("submit-button").click();

    cy.alertExistsWith(
      "The selected Enrollment Month dates have already been assigned to another A/P form. Please choose different dates."
    );
  });

  it("rejects creating a form that contains an expiration date that has already past", () => {
    cy.findByTestId("ap-form").should("exist");

    cy.findByTestId("seasonId-selected-value").click();

    cy.findByTestId(currentSeason).first().click();

    cy.findElementByNameAttribute("input", "startMonth").click();

    cy.clickNextMonth();

    cy.selectDate(1);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "endMonth").click();

    cy.clickNextMonth();

    cy.selectDate(28);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "expirationDate").click();

    cy.clickPreviousMonth();

    cy.selectDate(1);

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith(
      "The selected 'Expiration Date' has already past. Please select a later date."
    );
  });

  it("rejects creating a form that contains an send date that has already past", () => {
    cy.findByTestId("ap-form").should("exist");

    cy.findByTestId("seasonId-selected-value").click();

    cy.findByTestId(currentSeason).first().click();

    cy.findElementByNameAttribute("input", "startMonth").click();

    cy.clickNextMonth();

    cy.selectDate(1);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "endMonth").click();

    cy.clickNextMonth();

    cy.selectDate(28);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "expirationDate").click();

    cy.clickNextMonth();

    cy.selectDate(7);

    cy.clickOK();

    cy.findElementByNameAttribute(
      "input",
      "sendEmailNotificationsDate"
    ).click();

    cy.clickPreviousMonth();

    cy.selectDate(1);

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith(
      "The selected 'Send Email Notifications Date' has already past. Please select a later date."
    );
  });

  it("creates a new A/P form", () => {
    cy.findByTestId("ap-form").should("exist");

    cy.findByTestId("seasonId-selected-value").click();

    cy.findByTestId(currentSeason).first().click();

    cy.findElementByNameAttribute("input", "startMonth").click();

    cy.clickNextMonth();

    cy.selectDate(1);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "endMonth").click();

    cy.clickNextMonth();

    cy.selectDate(27);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "expirationDate").click();

    cy.clickNextMonth();

    cy.selectDate(7);

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith("Successfully created a new AP form!");

    cy.url().should("contain", "/employee/forms/viewall?page=1");
  });
});
