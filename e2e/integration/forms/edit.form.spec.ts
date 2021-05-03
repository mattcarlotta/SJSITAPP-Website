import moment from "../../../src/utils/momentWithTimezone";
import { fullyearFormat, fulldayFormat } from "../../../src/utils/dateFormats";

const lastDayOfNextMonth = moment()
  .add(1, "month")
  .endOf("month")
  .format(fulldayFormat);
const lastDayNextNextMonth = moment()
  .add(2, "months")
  .endOf("month")
  .format(fulldayFormat);

context("Staff Edit Form Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/forms/viewall?page=1");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the Edit Form form", () => {
    cy.findByTestId("table-actions").last().click();
    cy.findByTestId("edit-record").click();

    cy.findByTestId("edit-apform-page").should("exist");
    cy.findByTestId("ap-form").should("exist");
  });

  it("rejects creating a form that already exists", () => {
    cy.findByTestId("table-actions").eq(1).click();
    cy.findByTestId("edit-record").click();
    cy.findByTestId("ap-form").should("exist");

    cy.findElementByNameAttribute("input", "startMonth").click();

    cy.clickNextMonth();

    cy.selectDate(1);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "endMonth").click();

    cy.clickNextMonth();

    cy.selectDate(parseInt(lastDayOfNextMonth, 10));

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith(
      "The selected Enrollment Month dates have already been assigned to another A/P form. Please choose different dates."
    );
  });

  it("rejects creating a form that already exists", () => {
    cy.findByTestId("table-actions").eq(1).click();
    cy.findByTestId("edit-record").click();
    cy.findByTestId("ap-form").should("exist");

    cy.findElementByNameAttribute("input", "startMonth").click();

    cy.clickNextMonth();
    cy.clickNextMonth();

    cy.selectDate(1);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "endMonth").click();

    cy.clickNextMonth();
    cy.clickNextMonth();

    cy.selectDate(parseInt(lastDayNextNextMonth, 10));

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith("Successfully updated the AP form!");
  });
});
