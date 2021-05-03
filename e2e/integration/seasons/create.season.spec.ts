import moment from "../../../src/utils/momentWithTimezone";
import { fullyearFormat } from "../../../src/utils/dateFormats";

const nextYear = moment().add(1, "year").format(fullyearFormat);

const twoYearsFromNow = moment().add(2, "year").format(fullyearFormat);
const threeYearsFromNow = moment().add(3, "year").format(fullyearFormat);

context("Staff Create Season Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/seasons/create");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the Create Season form", () => {
    cy.findByTestId("create-season-page").should("exist");
    cy.findByTestId("season-form").should("exist");
  });

  it("displays errors if empty fields are submitted", () => {
    cy.submitForm();

    cy.formHasErrors(3);
  });

  it("rejects creating a season that already exists", () => {
    cy.findElementByNameAttribute("input", "startDate").click();

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

  it("creates a new season", () => {
    cy.findElementByNameAttribute("input", "startDate").click();

    cy.clickYear();

    cy.selectYear(twoYearsFromNow);

    cy.clickOK();

    cy.findElementByNameAttribute("input", "endDate").click();

    cy.clickYear();

    cy.selectYear(threeYearsFromNow);

    cy.clickOK();

    cy.submitForm();

    cy.alertExistsWith("Successfully created a new season!");

    cy.url().should("contain", "/employee/seasons/viewall?page=1");
  });
});
