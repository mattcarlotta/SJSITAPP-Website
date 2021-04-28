context("Privacy Policy Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.memberLogin();
    cy.reload();
    cy.visit("/employee/privacy");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the privacy page", () => {
    cy.findByTestId("card-head-title").contains("Privacy");
  });
});
