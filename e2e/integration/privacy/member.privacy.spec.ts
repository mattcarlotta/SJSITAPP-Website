context("Member Privacy Policy Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.request("POST", "http://localhost:5000/api/signin", {
      email: "scheduledmember@test.com",
      password: "password"
    });
    cy.reload();
    cy.visit("/employee/privacy");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the privacy page", () => {
    cy.get("[data-testid='privacy-page']")
      .find("[data-testid='card-head-title']")
      .contains("Privacy");
  });
});
