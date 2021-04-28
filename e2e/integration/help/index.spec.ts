context("Help Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.memberLogin();
    cy.reload();
    cy.visit("/employee/help");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the help page", () => {
    cy.findByTestId("card-head-title").contains("Help");
  });

  it("opens and closes accordions", () => {
    cy.get(".MuiAccordion-root")
      .first()
      .find("[aria-expanded='false']")
      .should("exist");

    cy.get(".MuiAccordion-root").first().click();

    cy.get(".MuiAccordion-root")
      .first()
      .find("[aria-expanded='true']")
      .should("exist");

    cy.get(".Mui-expanded").eq(1).click();

    cy.get(".MuiAccordion-root")
      .first()
      .find("[aria-expanded='false']")
      .should("exist");
  });

  it("selects a help topic when using the inner page search bar", () => {
    cy.get("input").eq(1).should("exist").type("How do I change my email?");

    cy.findByTestId("How do I change my email?").click();

    cy.url().should("contain", "/employee/help#how-do-i-change-my-email");

    cy.get(".MuiAccordion-root")
      .eq(1)
      .find("[aria-expanded='true']")
      .should("exist");
  });
});
