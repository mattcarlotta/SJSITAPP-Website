context("Staff Dashboard Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/dashboard");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("only displays staff routes in the side navigation", () => {
    cy.findByTestId("sidemenu-tree")
      .find("li")
      .should("have.length", 13)
      .and(e => {
        const elements = e.map((_, el) => Cypress.$(el));

        expect(elements[0].text()).to.equal("Dashboard");
        expect(elements[1].text()).to.equal("Events");
        expect(elements[2].text()).to.equal("Forms");
        expect(elements[3].text()).to.equal("Mail");
        expect(elements[4].text()).to.equal("Members");
        expect(elements[5].text()).to.equal("Schedule");
        expect(elements[6].text()).to.equal("Seasons");
        expect(elements[7].text()).to.equal("Services");
        expect(elements[8].text()).to.equal("Settings");
        expect(elements[9].text()).to.equal("Help");
        expect(elements[10].text()).to.equal("Contact Us");
        expect(elements[11].text()).to.equal("Privacy");
        expect(elements[12].text()).to.equal("Licensing");
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

  it("displays an employee list of availabilites", () => {
    cy.findByTestId("employee-availability-list")
      .should("exist")
      .find("li")
      .first()
      .contains("Matthew Carlotta");
  });
});
