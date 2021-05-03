import moment from "../../../src/utils/momentWithTimezone";
import { fullyearFormat } from "../../../src/utils/dateFormats";

const currentYear = moment().format(fullyearFormat);
const nextYear = moment().add(1, "year").format(fullyearFormat);

context("Staff Edit Season Page", () => {
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

  it("displays the Edit Season form", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").eq(3).should("exist").click();

    cy.findByTestId("edit-record").click();

    cy.url().should("contain", "/employee/seasons/edit");

    cy.findByTestId("edit-season-page").should("exist");
  });

  it("rejects creating a season that already exists", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").eq(3).should("exist").click();

    cy.findByTestId("edit-record").click();

    cy.findByTestId("edit-season-page").should("exist");

    cy.findElementByNameAttribute("input", "startDate").click();

    cy.clickYear();

    cy.selectYear(currentYear);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "endDate").click();

    cy.clickYear();

    cy.selectYear(nextYear);

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith(
      "That season already exists. Please edit the current season or choose different start and end dates."
    );
  });

  it("updates a season", () => {
    cy.findByTestId("data-table").should("exist");

    cy.findByDataField("seasonId").eq(4).contains("20002001");

    cy.findByTestId("table-actions").eq(3).should("exist").click();

    cy.findByTestId("edit-record").click();

    cy.findByTestId("edit-season-page").should("exist");

    cy.findElementByNameAttribute("input", "startDate").click();

    cy.clickYear();

    cy.selectYear("1990");

    cy.clickOK();

    cy.findElementByNameAttribute("input", "endDate").click();

    cy.clickYear();

    cy.selectYear("1991");

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith("Successfully updated the season.");

    cy.url().should("contain", "/employee/seasons/viewall?page=1");

    cy.findByDataField("seasonId").eq(4).contains("19901991");
  });
});
