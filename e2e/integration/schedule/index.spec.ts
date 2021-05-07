import moment from "../../../src/utils/momentWithTimezone";
import {
  fullyearFormat,
  monthnameFormat
} from "../../../src/utils/dateFormats";

const currentMonth = moment().format(monthnameFormat);
const currentYear = moment().format(fullyearFormat);
const nextYear = moment().add(1, "year").format(fullyearFormat);
const twoMonthsFromNow = moment().add(2, "months").format(monthnameFormat);

context("Schedule Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.memberLogin();
    cy.visit("/employee/schedule");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the schedule page", () => {
    cy.findByTestId("card-head-title").contains("Schedule");
  });

  it("displays a calendar", () => {
    cy.findByTestId("calender-container").should("exist");

    cy.findByTestId("upcoming-event").should("exist");
  });

  it("renders an event details", () => {
    cy.findByTestId("upcoming-event").first().click();

    cy.findByTestId("event-details-content")
      .find("li")
      .should(e => {
        const elements = e.map((_, el) => Cypress.$(el));

        expect(elements[0].text()).to.contain(
          "San Jose Barracudavs.Binghamton Devils"
        );
        expect(elements[1].text()).to.be.a("string");
        expect(elements[2].text()).to.contain("Game");
        expect(elements[3].text()).to.contain("Unscheduled game.");
        expect(elements[4].text()).to.contain("SAP Center at San Jose");
        expect(elements[5].text()).to.contain("Barracuda Jacket");
      });

    cy.findByTestId("close-modal").click();

    cy.findByTestId("event-details-content").should("not.exist");
  });

  it("renders the previous month when 'previous-month-button' button is clicked", () => {
    cy.findByTestId("previous-month-button").should("exist").click();

    cy.findByTestId("upcoming-event").should("not.exist");
  });

  it("renders the next month when 'next-month-button' button is clicked", () => {
    cy.findByTestId("next-month-button").should("exist").click();

    cy.findByTestId("upcoming-event").should("exist");
  });

  it("renders the 'My Events' when 'selectedGames' button is clicked", () => {
    cy.findByTestId("selectedGames-selected-value")
      .should("exist")
      .contains("All Events")
      .click();

    cy.findByTestId("My Events").should("exist").click();

    cy.findByTestId("selectedGames-selected-value").contains("My Events");
  });

  it("renders the next month when 'selectedMonth' button is clicked", () => {
    cy.findByTestId("selectedMonth-selected-value")
      .should("exist")
      .contains(currentMonth)
      .click();

    cy.findByTestId(twoMonthsFromNow).should("exist").click();

    cy.findByTestId("selectedMonth-selected-value").contains(twoMonthsFromNow);
  });

  it("renders the next year when 'selectedYear' button is clicked", () => {
    cy.findByTestId("selectedYear-selected-value")
      .should("exist")
      .contains(currentYear)
      .click();

    cy.findByTestId(nextYear).should("exist").click();

    cy.findByTestId("selectedYear-selected-value").contains(nextYear);
  });
});
