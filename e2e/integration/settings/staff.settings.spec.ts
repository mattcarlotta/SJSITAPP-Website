context("Staff Settings Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/settings");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("intially displays the profile tab", () => {
    cy.findByTestId("settings-page").should("exist");

    cy.findByTestId("member-profile").should("exist");
  });

  it("only displays a profile tab", () => {
    cy.findByTestId("tab-profile").should("exist");
    cy.findByTestId("tab-availability").should("not.exist");
    cy.findByTestId("tab-responses").should("not.exist");
  });
});
