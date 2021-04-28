context("Member Dashboard Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.memberLogin();
    cy.reload();
    cy.visit("/employee/dashboard");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("only displays employee routes in the side navigation", () => {
    cy.findByTestId("sidemenu-tree")
      .find("li")
      .should("have.length", 7)
      .and(e => {
        const elements = e.map((_, el) => Cypress.$(el));

        expect(elements[0].text()).to.equal("Dashboard");
        expect(elements[1].text()).to.equal("Schedule");
        expect(elements[2].text()).to.equal("Settings");
        expect(elements[3].text()).to.equal("Help");
        expect(elements[4].text()).to.equal("Contact Us");
        expect(elements[5].text()).to.equal("Privacy");
        expect(elements[6].text()).to.equal("Licensing");
      });
  });

  it("displays events, forms, availability and event distribution tiles", () => {
    cy.findByTestId("card-head-title").should(e => {
      const elements = e.map((_, el) => Cypress.$(el));

      expect(elements[0].text()).to.equal("Events");
      expect(elements[1].text()).to.equal("Forms");
      expect(elements[2].text()).to.equal("Availability");
      expect(elements[3].text()).to.equal("Event Distribution");
    });
  });

  it("displays and hides an event details", () => {
    cy.findByTestId("upcoming-event").click();

    cy.findByTestId("event-details-content")
      .find("li")
      .should(e => {
        const elements = e.map((_, el) => Cypress.$(el));

        expect(elements[0].text()).to.contain(
          "San Jose Barracudavs.Chicago Wolves"
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

  it("displays upcoming games", () => {
    cy.findByTestId("tab-upcoming").click();

    cy.findByTestId("upcoming-event").should("exist");
  });

  it("displays current member availability average", () => {
    cy.findByTestId("availability-avg").should("have.text", "100%");
  });

  it("allows a user to view and update the current AP Form", () => {
    cy.findByTestId("dashboard-ap-form-link").click();

    cy.url().should("contain", "/employee/forms/view");

    cy.findByTestId("ap-form").should("exist");

    cy.findByTestId("radio-container")
      .should("have.length", 3)
      .find("button")
      .then(e => {
        const elements = e.map((_, el) => Cypress.$(el));

        cy.wrap(elements[3]).click();
        cy.wrap(elements[7]).click();
        cy.wrap(elements[11]).click();
      });

    cy.findByTestId("submit-button").click();

    cy.url().should("contain", "/employee/dashboard");

    cy.findByTestId("alert-message")
      .should("exist")
      .and("have.text", "Successfully added your responses to the A/P form!");

    cy.findByTestId("availability-avg").should("have.text", "0%");

    cy.findByTestId("alert-message").click();
  });

  it("updates the event-distribution chart", () => {
    cy.findByTestId("event-distribution-chart").should("exist");

    cy.get("input[name='startDate']").click();

    cy.get(".MuiPickersCalendarHeader-switchHeader")
      .find("button")
      .first()
      .click();

    cy.get(".MuiPickersCalendar-week").eq(1).find("button").first().click();

    cy.get(".MuiDialogActions-root.MuiDialogActions-spacing")
      .find("button")
      .eq(1)
      .click();

    cy.get("input[name='endDate']").click();

    cy.get(".MuiPickersCalendarHeader-switchHeader")
      .find("button")
      .first()
      .click();

    cy.get(".MuiPickersCalendar-week").eq(1).find("button").first().click();

    cy.get(".MuiDialogActions-root.MuiDialogActions-spacing")
      .find("button")
      .eq(1)
      .click();

    cy.findByTestId("no-event-distribution").should("exist");
  });
});
