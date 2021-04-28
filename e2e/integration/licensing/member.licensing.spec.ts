context("Member Licensing Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.request("POST", "http://localhost:5000/api/signin", {
      email: "scheduledmember@test.com",
      password: "password"
    });
    cy.reload();
    cy.visit("/employee/licensing");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the licensing page", () => {
    cy.get("[data-testid='licensing-page']")
      .find("[data-testid='card-head-title']")
      .contains("Licensing");
  });
});
