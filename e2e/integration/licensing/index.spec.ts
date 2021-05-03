context("Licensing Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.memberLogin();
    cy.visit("/employee/licensing");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the licensing page", () => {
    cy.findByTestId("card-head-title").contains("Licensing");
  });
});
